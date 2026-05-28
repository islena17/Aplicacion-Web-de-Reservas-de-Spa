<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;
use App\Mail\ReservationMail;
use App\Models\EmployeeBlock;
use App\Models\Reservation;
use App\Models\Service;
use App\Models\Spa;
use App\Services\AvailabilityService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{
    // Obtiene el spa asociado al administrador autenticado.
    private function getAdminSpaId(): int
    {
        $spa = Spa::where('user_id', Auth::id())->first();

        if (!$spa) {
            abort(404, 'Este admin no tiene un spa asignado.');
        }

        return $spa->id;
    }

    public function index()
    {
        $spaId = $this->getAdminSpaId();

        // Lista las reservas pertenecientes al spa del admin.
        $query = Reservation::with([
            'client',
            'spa',
            'service',
            'employee',
        ])->where('spa_id', $spaId);

        // Filtros opcionales para buscar reservas concretas.
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

    public function store(
        ReservationRequest $request,
        AvailabilityService $availabilityService
    ) {
        $spaId = $this->getAdminSpaId();
        $data = $request->validated();

        // Evita que el admin pueda asignar la reserva a otro spa.
        unset($data['spa_id']);

        // Comprueba que el servicio pertenece al spa del admin.
        $service = Service::where('spa_id', $spaId)
            ->findOrFail($data['service_id']);

        // Valida que no se supere la capacidad máxima del servicio.
        if (
            Reservation::exceedsServiceCapacity(
                $service,
                $data['number_of_people']
            )
        ) {
            return response()->json([
                'message' => 'No se puede reservar para más personas de las que permite este servicio.',
                'errors' => [
                    'number_of_people' => [
                        'La capacidad máxima de este servicio es de ' . $service->capacity . ' personas.',
                    ],
                ],
            ], 422);
        }

        // Calcula el precio final según el servicio y número de personas.
        $finalPrice = Reservation::calculateTotalPrice(
            $service,
            $data['number_of_people']
        );

        $employeeId = $data['employee_id'] ?? null;

        // Si se asigna empleado, se comprueba su disponibilidad.
        if ($employeeId) {
            $availabilityService->validateEmployeeAvailability(
                $spaId,
                $employeeId,
                $data['reservation_date'],
                $data['start_time'],
                $data['end_time']
            );
        }

        // Crea la reserva y bloquea el horario del empleado en una transacción.
        $reservation = DB::transaction(function () use (
            $data,
            $spaId,
            $employeeId,
            $finalPrice,
            $service
        ) {
            $reservation = Reservation::create([
                ...$data,
                'spa_id' => $spaId,
                'service_price' => $service->price,
                'final_price' => $finalPrice,
            ]);

            // Bloquea la franja horaria del empleado asignado.
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

        $reservation->load([
            'client',
            'spa',
            'service',
            'employee',
        ]);

        // Envía el correo de confirmación al cliente.
        Mail::to($reservation->client->email)
            ->send(new ReservationMail($reservation));

        return response()->json([
            'message' => 'Reserva creada correctamente',
            'data' => $reservation,
        ], 201);
    }

    public function show(Reservation $reservation)
    {
        $spaId = $this->getAdminSpaId();

        // Evita consultar reservas de otros spas.
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
        $spaId = $this->getAdminSpaId();

        // Comprueba que la reserva pertenece al spa del admin.
        if ($reservation->spa_id !== $spaId) {
            abort(404);
        }

        $data = $request->validated();

        // Evita que el admin cambie la reserva a otro spa.
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

    public function destroy(Reservation $reservation)
    {
        $spaId = $this->getAdminSpaId();

        // Evita eliminar reservas de otros spas.
        if ($reservation->spa_id !== $spaId) {
            abort(404);
        }

        // Elimina el bloqueo asociado al empleado.
        EmployeeBlock::where('employee_id', $reservation->employee_id)
            ->where('date', $reservation->reservation_date)
            ->where('start_time', $reservation->start_time)
            ->where('end_time', $reservation->end_time)
            ->where('reason', 'Reserva #' . $reservation->id)
            ->delete();

        // Elimina la reserva.
        $reservation->delete();

        return response()->json([
            'message' => 'Reserva eliminada correctamente',
        ]);
    }
}