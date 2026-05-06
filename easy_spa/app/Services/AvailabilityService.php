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
        $service = Service::where('spa_id', $spaId)
            ->where('is_active', true)
            ->findOrFail($serviceId);

        $dayOfWeek = Carbon::parse($date)->dayOfWeek;

        $spaSchedule = SpaSchedule::where('spa_id', $spaId)
            ->where('day_of_week', $dayOfWeek)
            ->where('is_working', true)
            ->first();

        if (!$spaSchedule) {
            return [];
        }

        $employeesQuery = Employee::where('spa_id', $spaId);

        if ($service->requires_employee) {
            if ($employeeId) {
                $employeesQuery->where('id', $employeeId);
            }
        } else {
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
            $employeeSchedule = EmployeeSchedule::where('employee_id', $employee->id)
                ->where('day_of_week', $dayOfWeek)
                ->where('is_working', true)
                ->first();

            if (!$employeeSchedule) {
                continue;
            }

            $startBoundary = $this->maxTime(
                $spaSchedule->start_time,
                $employeeSchedule->start_time
            );

            $endBoundary = $this->minTime(
                $spaSchedule->end_time,
                $employeeSchedule->end_time
            );

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

        while ($start->copy()->addMinutes($service->length_minutes) <= $end) {
            $slotEnd = $start->copy()->addMinutes($service->length_minutes);

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

        while ($start->copy()->addMinutes($durationMinutes) <= $end) {
            $slotEnd = $start->copy()->addMinutes($durationMinutes);

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

        return
            !$this->hasOverlappingReservation($employeeId, $date, $start, $end)
            &&
            !$this->hasBlockingPeriod($employeeId, $date, $start, $end);
    }

    private function maxTime(string $timeA, string $timeB): string
    {
        return $timeA > $timeB ? $timeA : $timeB;
    }

    private function minTime(string $timeA, string $timeB): string
    {
        return $timeA < $timeB ? $timeA : $timeB;
    }

    public function validateEmployeeAvailability(
        int $spaId,
        int $employeeId,
        string $date,
        string $startTime,
        string $endTime
    ): void {
        $employee = Employee::where('spa_id', $spaId)
            ->where('is_active', true)
            ->findOrFail($employeeId);

        $schedule = EmployeeSchedule::where('employee_id', $employee->id)
            ->where('date', $date)
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

        if ($this->hasBlockingPeriod($employee->id, $date, $start, $end)) {
            abort(response()->json([
                'message' => 'El empleado ya está bloqueado en ese horario.',
            ], 422));
        }

        if ($this->hasOverlappingReservation($employee->id, $date, $start, $end)) {
            abort(response()->json([
                'message' => 'El empleado ya tiene una reserva en ese horario.',
            ], 422));
        }
    }
}
