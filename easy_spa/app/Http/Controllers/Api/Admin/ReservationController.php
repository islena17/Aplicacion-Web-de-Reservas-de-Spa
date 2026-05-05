<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;
use App\Models\Employee;
use App\Models\EmployeeBlock;
use App\Models\EmployeeSchedule;
use App\Models\Reservation;
use App\Models\Spa;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    /**
     * Obtener el id del spa del admin autenticado.
     */
    private function getAdminSpaId(): int
    {
        $spa = Spa::where('user_id', Auth::id())->first();

        if (!$spa) {
            abort(404, 'Este admin no tiene un spa asignado.');
        }

        return $spa->id;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $spaId = $this->getAdminSpaId();

        $query = Reservation::with([
            'client',
            'spa',
            'service',
            'employee',
        ])->where('spa_id', $spaId);

        if (request('employee_id')) {
            $query->where('employee_id', request('employee_id'));
        }

        if (request('client_id')) {
            $query->where('client_id', request('client_id'));
        }

        if (request('reservation_date')) {
            $query->where('reservation_date', request('reservation_date'));
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }

        $reservations = $query->latest()->paginate(10);

        return response()->json($reservations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReservationRequest $request)
    {
        $spaId = $this->getAdminSpaId();
        $data = $request->validated();

        unset($data['spa_id']);

        $employeeId = $data['employee_id'] ?? null;

        if ($employeeId) {
            $employee = Employee::where('spa_id', $spaId)
                ->where('is_active', true)
                ->findOrFail($employeeId);

            $date = $data['reservation_date'];
            $start = $data['start_time'];
            $end = $data['end_time'];

            // 1. Comprobar que trabaja ese día
            $schedule = EmployeeSchedule::where('employee_id', $employee->id)
                ->where('date', $date)
                ->where('is_working', true)
                ->where('start_time', '<=', $start)
                ->where('end_time', '>=', $end)
                ->first();

            if (!$schedule) {
                return response()->json([
                    'message' => 'El empleado no trabaja en ese horario.'
                ], 422);
            }

            // 2. Comprobar bloqueos
            $hasBlock = EmployeeBlock::where('employee_id', $employee->id)
                ->where('date', $date)
                ->where('is_available', false)
                ->where(function ($query) use ($start, $end) {
                    $query->where('start_time', '<', $end)
                        ->where('end_time', '>', $start);
                })
                ->exists();

            if ($hasBlock) {
                return response()->json([
                    'message' => 'El empleado ya está bloqueado en ese horario.'
                ], 422);
            }

            // 3. Comprobar reservas existentes
            $hasReservation = Reservation::where('employee_id', $employee->id)
                ->where('reservation_date', $date)
                ->whereIn('status', ['pending', 'confirmed'])
                ->where(function ($query) use ($start, $end) {
                    $query->where('start_time', '<', $end)
                        ->where('end_time', '>', $start);
                })
                ->exists();

            if ($hasReservation) {
                return response()->json([
                    'message' => 'El empleado ya tiene una reserva en ese horario.'
                ], 422);
            }
        }

        $reservation = DB::transaction(function () use ($data, $spaId, $employeeId) {
            $reservation = Reservation::create([
                ...$data,
                'spa_id' => $spaId,
            ]);

            if ($employeeId) {
                EmployeeBlock::create([
                    'employee_id' => $employeeId,
                    'date' => $reservation->reservation_date,
                    'start_time' => $reservation->start_time,
                    'end_time' => $reservation->end_time,
                    'reason' => 'Reserva #' . $reservation->id,
                    'is_available' => false,
                ]);
            }

            return $reservation;
        });

        return response()->json([
            'message' => 'Reserva creada correctamente',
            'data' => $reservation->load([
                'client',
                'spa',
                'service',
                'employee',
            ]),
        ], 201);
    }
    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        $spaId = $this->getAdminSpaId();

        if ($reservation->spa_id !== $spaId) {
            abort(404);
        }

        return response()->json([
            'data' => $reservation->load([
                'client',
                'spa',
                'service',
                'employee',
            ]),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ReservationRequest $request, Reservation $reservation)
    {
        $spaId = $this->getAdminSpaId();

        if ($reservation->spa_id !== $spaId) {
            abort(404);
        }

        $data = $request->validated();

        // Evitar que el admin cambie la reserva a otro spa
        unset($data['spa_id']);

        $reservation->update($data);

        return response()->json([
            'message' => 'Reserva actualizada correctamente',
            'data' => $reservation->load([
                'client',
                'spa',
                'service',
                'employee',
            ]),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        $spaId = $this->getAdminSpaId();

        if ($reservation->spa_id !== $spaId) {
            abort(404);
        }

        //  borrar bloqueo asociado
        EmployeeBlock::where('employee_id', $reservation->employee_id)
            ->where('date', $reservation->reservation_date)
            ->where('start_time', $reservation->start_time)
            ->where('end_time', $reservation->end_time)
            ->where('reason', 'Reserva #' . $reservation->id)
            ->delete();

        // eliminar reserva
        $reservation->delete();

        return response()->json([
            'message' => 'Reserva eliminada correctamente',
        ]);
    }
}
