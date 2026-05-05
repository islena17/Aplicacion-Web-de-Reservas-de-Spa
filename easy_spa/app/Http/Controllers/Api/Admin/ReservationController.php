<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;
use App\Models\Reservation;
use App\Models\Spa;
use Illuminate\Support\Facades\Auth;

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

        $reservation = Reservation::create([
            ...$request->validated(),
            'spa_id' => $spaId,
        ]);

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

        $reservation->delete();

        return response()->json([
            'message' => 'Reserva eliminada correctamente',
        ]);
    }
}