<?php

namespace App\Services;

use App\Models\Employee;
use App\Models\EmployeeBlock;
use App\Models\EmployeeSchedule;
use App\Models\Reservation;
use App\Models\Service;
use App\Models\SpaSchedule;
use Carbon\Carbon;

class AvailabilityService
{
    public function getAvailableSlots(
        int $spaId,
        int $serviceId,
        string $date,
        ?int $employeeId = null,
        int $interval = 30
    ): array {
        // Obtiene el servicio activo del spa indicado.
        $service = Service::where('spa_id', $spaId)
            ->where('is_active', true)
            ->findOrFail($serviceId);

        $dayOfWeek = Carbon::parse($date)->dayOfWeek;

        // Comprueba que el spa trabaje ese día.
        $spaSchedule = SpaSchedule::where('spa_id', $spaId)
            ->where('day_of_week', $dayOfWeek)
            ->where('is_working', true)
            ->first();

        if (!$spaSchedule) {
            return [];
        }

        $employeesQuery = Employee::where('spa_id', $spaId);

        // Si el servicio requiere empleado, se filtra por el empleado seleccionado.
        if ($service->requires_employee) {
            if ($employeeId) {
                $employeesQuery->where('id', $employeeId);
            }
        } else {
            // Si no requiere empleado, se calculan huecos por capacidad del servicio.
            return $this->getSlotsWithoutEmployee(
                $spaId,
                $service,
                $date,
                $spaSchedule->start_time,
                $spaSchedule->end_time,
                $interval
            );
        }

        $employees = $employeesQuery->get();

        $slots = [];

        foreach ($employees as $employee) {
            // Obtiene el horario concreto del empleado para la fecha seleccionada.
            $employeeSchedule = EmployeeSchedule::where('employee_id', $employee->id)
                ->where('date', $date)
                ->where('is_working', true)
                ->first();

            if (!$employeeSchedule) {
                continue;
            }

            // Calcula el tramo común entre el horario del spa y el del empleado.
            $startBoundary = $this->maxTime(
                $spaSchedule->start_time,
                $employeeSchedule->start_time
            );

            $endBoundary = $this->minTime(
                $spaSchedule->end_time,
                $employeeSchedule->end_time
            );

            // Genera los huecos disponibles para ese empleado.
            $employeeSlots = $this->buildSlotsForEmployee(
                $employee->id,
                $date,
                $service->length_minutes,
                $startBoundary,
                $endBoundary,
                $interval
            );

            foreach ($employeeSlots as $slot) {
                $slots[] = [
                    'employee_id' => $employee->id,
                    'start_time' => $slot['start_time'],
                    'end_time' => $slot['end_time'],
                ];
            }
        }

        // Ordena los huecos disponibles por hora de inicio.
        usort($slots, function ($a, $b) {
            return strcmp($a['start_time'], $b['start_time']);
        });

        return $slots;
    }

    private function getSlotsWithoutEmployee(
        int $spaId,
        Service $service,
        string $date,
        string $startTime,
        string $endTime,
        int $interval
    ): array {
        $slots = [];

        $start = Carbon::parse($date . ' ' . $startTime);
        $end = Carbon::parse($date . ' ' . $endTime);

        // Recorre el horario del spa generando posibles huecos.
        while ($start->copy()->addMinutes($service->length_minutes) <= $end) {
            $slotEnd = $start->copy()->addMinutes($service->length_minutes);

            // Cuenta reservas que se solapan con el hueco actual.
            $hasReservation = Reservation::where('spa_id', $spaId)
                ->where('service_id', $service->id)
                ->where('reservation_date', $date)
                ->where('status', '!=', 'cancelled')
                ->where(function ($query) use ($start, $slotEnd) {
                    $query
                        ->where('start_time', '<', $slotEnd->format('H:i:s'))
                        ->where('end_time', '>', $start->format('H:i:s'));
                })
                ->count();

            // Añade el hueco si todavía no se ha superado la capacidad.
            if ($hasReservation < $service->capacity) {
                $slots[] = [
                    'employee_id' => null,
                    'start_time' => $start->format('H:i'),
                    'end_time' => $slotEnd->format('H:i'),
                ];
            }

            $start->addMinutes($interval);
        }

        return $slots;
    }

    private function buildSlotsForEmployee(
        int $employeeId,
        string $date,
        int $durationMinutes,
        string $startTime,
        string $endTime,
        int $interval
    ): array {
        $slots = [];

        $start = Carbon::parse($date . ' ' . $startTime);
        $end = Carbon::parse($date . ' ' . $endTime);

        // Genera huecos dentro del horario disponible del empleado.
        while ($start->copy()->addMinutes($durationMinutes) <= $end) {
            $slotEnd = $start->copy()->addMinutes($durationMinutes);

            // Añade el hueco si no existe reserva ni bloqueo.
            if (
                !$this->hasOverlappingReservation($employeeId, $date, $start, $slotEnd) &&
                !$this->hasBlockingPeriod($employeeId, $date, $start, $slotEnd)
            ) {
                $slots[] = [
                    'start_time' => $start->format('H:i'),
                    'end_time' => $slotEnd->format('H:i'),
                ];
            }

            $start->addMinutes($interval);
        }

        return $slots;
    }

    private function hasOverlappingReservation(
        int $employeeId,
        string $date,
        Carbon $start,
        Carbon $end
    ): bool {
        // Comprueba si existe una reserva que se solape con el horario indicado.
        return Reservation::where('employee_id', $employeeId)
            ->where('reservation_date', $date)
            ->where('status', '!=', 'cancelled')
            ->where(function ($query) use ($start, $end) {
                $query
                    ->where('start_time', '<', $end->format('H:i:s'))
                    ->where('end_time', '>', $start->format('H:i:s'));
            })
            ->exists();
    }

    private function hasBlockingPeriod(
        int $employeeId,
        string $date,
        Carbon $start,
        Carbon $end
    ): bool {
        // Comprueba si el empleado tiene un bloqueo en esa franja.
        return EmployeeBlock::where('employee_id', $employeeId)
            ->where('date', $date)
            ->where('is_available', false)
            ->where(function ($query) use ($start, $end) {
                $query
                    ->where('start_time', '<', $end->format('H:i:s'))
                    ->where('end_time', '>', $start->format('H:i:s'));
            })
            ->exists();
    }

    public function isEmployeeAvailable(
        int $employeeId,
        string $date,
        string $startTime,
        string $endTime
    ): bool {
        $start = Carbon::parse($date . ' ' . $startTime);
        $end = Carbon::parse($date . ' ' . $endTime);

        // Devuelve si el empleado está libre en la franja indicada.
        return
            !$this->hasOverlappingReservation($employeeId, $date, $start, $end)
            &&
            !$this->hasBlockingPeriod($employeeId, $date, $start, $end);
    }

    private function maxTime(string $timeA, string $timeB): string
    {
        // Devuelve la hora de inicio más tardía.
        return $timeA > $timeB ? $timeA : $timeB;
    }

    private function minTime(string $timeA, string $timeB): string
    {
        // Devuelve la hora de fin más temprana.
        return $timeA < $timeB ? $timeA : $timeB;
    }

    public function validateEmployeeAvailability(
        int $spaId,
        int $employeeId,
        string $date,
        string $startTime,
        string $endTime
    ): void {
        // Comprueba que el empleado pertenece al spa y está activo.
        $employee = Employee::where('spa_id', $spaId)
            ->where('is_active', true)
            ->findOrFail($employeeId);

        $dayOfWeek = Carbon::parse($date)->dayOfWeek;

        // Verifica que el empleado trabaja dentro de la franja solicitada.
        $schedule = EmployeeSchedule::where('employee_id', $employee->id)
            ->where('day_of_week', $dayOfWeek)
            ->where('is_working', true)
            ->where('start_time', '<=', $startTime)
            ->where('end_time', '>=', $endTime)
            ->first();

        if (!$schedule) {
            abort(response()->json([
                'message' => 'El empleado no trabaja en ese horario.',
            ], 422));
        }

        $start = Carbon::parse($date . ' ' . $startTime);
        $end = Carbon::parse($date . ' ' . $endTime);

        // Impide reservar si el empleado está bloqueado.
        if ($this->hasBlockingPeriod($employee->id, $date, $start, $end)) {
            abort(response()->json([
                'message' => 'El empleado ya está bloqueado en ese horario.',
            ], 422));
        }

        // Impide reservar si el empleado ya tiene otra reserva.
        if ($this->hasOverlappingReservation($employee->id, $date, $start, $end)) {
            abort(response()->json([
                'message' => 'El empleado ya tiene una reserva en ese horario.',
            ], 422));
        }
    }
}