<?php

namespace App\Http\Controllers\Api\Employee;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;
use App\Models\Employee;
use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    private function getEmployeeSpaId(): int
    {
        return Auth::user()->employee->spa_id;
    }

    public function index()
    {
        $spaId = $this->getEmployeeSpaId();

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

    public function store(ReservationRequest $request)
    {
        $spaId = $this->getEmployeeSpaId();
        $data = $request->validated();

        $data['spa_id'] = $spaId;

        if (!empty($data['employee_id'])) {
            Employee::where('spa_id', $spaId)
                ->findOrFail($data['employee_id']);
        }

        $reservation = Reservation::create($data);

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

    public function show(Reservation $reservation)
    {
        $spaId = $this->getEmployeeSpaId();

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

    public function update(ReservationRequest $request, Reservation $reservation)
    {
        $spaId = $this->getEmployeeSpaId();

        if ($reservation->spa_id !== $spaId) {
            abort(404);
        }

        $data = $request->validated();
        unset($data['spa_id']);

        if (!empty($data['employee_id'])) {
            Employee::where('spa_id', $spaId)
                ->findOrFail($data['employee_id']);
        }

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

    public function destroy(Reservation $reservation)
    {
        $spaId = $this->getEmployeeSpaId();

        if ($reservation->spa_id !== $spaId) {
            abort(404);
        }

        $reservation->delete();

        return response()->json([
            'message' => 'Reserva eliminada correctamente',
        ]);
    }
}