<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;
use App\Mail\ReservationMail;
use App\Models\Client;
use App\Models\Employee;
use App\Models\EmployeeBlock;
use App\Models\Reservation;
use App\Models\Service;
use App\Models\Spa;
use App\Services\AvailabilityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class ReservationController extends Controller
{
    // Obtiene el cliente asociado al usuario autenticado.
    private function getAuthenticatedClient(): Client
    {
        return Client::where('user_id', Auth::id())->firstOrFail();
    }

    public function index()
    {
        $client = $this->getAuthenticatedClient();

        // Lista únicamente las reservas del cliente autenticado.
        $reservations = Reservation::with([
            'client',
            'spa',
            'service',
            'employee',
        ])
            ->where('client_id', $client->id)
            ->latest()
            ->paginate(10);

        return response()->json($reservations);
    }

    public function store(
        ReservationRequest $request,
        AvailabilityService $availabilityService
    ) {
        $client = $this->getAuthenticatedClient();
        $data = $request->validated();

        // Comprueba que el servicio existe y está activo.
        $service = Service::where('is_active', true)
            ->findOrFail($data['service_id']);

        // Valida que no se supere la capacidad máxima del servicio.
        if (
            Reservation::exceedsServiceCapacity(
                $service,
                $data['number_of_people']
            )
        ) {
            throw ValidationException::withMessages([
                'number_of_people' => [
                    'La capacidad máxima de este servicio es de ' . $service->capacity . ' personas.',
                ],
            ]);
        }

        // Calcula el precio final según el servicio y el número de personas.
        $data['final_price'] = Reservation::calculateTotalPrice(
            $service,
            $data['number_of_people']
        );

        $employeeId = $data['employee_id'] ?? null;

        // Si se selecciona empleado, se valida que pertenezca al spa y esté disponible.
        if ($employeeId) {
            Employee::where('spa_id', $service->spa_id)
                ->findOrFail($employeeId);

            $availabilityService->validateEmployeeAvailability(
                $service->spa_id,
                $employeeId,
                $data['reservation_date'],
                $data['start_time'],
                $data['end_time']
            );
        }

        // Crea la reserva y bloquea la franja del empleado en una transacción.
        $reservation = DB::transaction(function () use ($data, $client, $service, $employeeId) {
            $reservation = Reservation::create([
                ...$data,
                'client_id' => $client->id,
                'spa_id' => $service->spa_id,
                'status' => 'pending',
            ]);

            // Registra el bloqueo horario del empleado asignado.
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

        // Intenta enviar el correo de confirmación sin interrumpir la reserva si falla.
        try {
            Mail::to($reservation->client->email)
                ->send(new ReservationMail($reservation));

            Log::info('Email enviado correctamente');
        } catch (\Throwable $e) {
            Log::error('Error enviando email reserva', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }

        return response()->json([
            'message' => 'Reserva creada correctamente',
            'data' => $reservation,
        ], 201);
    }

    public function show(Reservation $reservation)
    {
        $client = $this->getAuthenticatedClient();

        // Evita que un cliente consulte reservas de otro usuario.
        if ($reservation->client_id !== $client->id) {
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
        $client = $this->getAuthenticatedClient();

        // Comprueba que la reserva pertenece al cliente autenticado.
        if ($reservation->client_id !== $client->id) {
            abort(404);
        }

        $data = $request->validated();

        // Evita modificar manualmente el cliente o spa desde la petición.
        unset($data['client_id'], $data['spa_id']);

        // Si cambia el servicio, se actualiza el spa correspondiente.
        if (isset($data['service_id'])) {
            $service = Service::where('is_active', true)
                ->findOrFail($data['service_id']);

            $data['spa_id'] = $service->spa_id;

            // Comprueba que el empleado pertenece al spa del nuevo servicio.
            if (!empty($data['employee_id'])) {
                Employee::where('spa_id', $service->spa_id)
                    ->findOrFail($data['employee_id']);
            }
        } elseif (!empty($data['employee_id'])) {
            // Comprueba el empleado usando el spa actual de la reserva.
            Employee::where('spa_id', $reservation->spa_id)
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
        $client = $this->getAuthenticatedClient();

        // Evita eliminar reservas de otros clientes.
        if ($reservation->client_id !== $client->id) {
            abort(404);
        }

        $reservation->delete();

        return response()->json([
            'message' => 'Reserva eliminada correctamente',
        ]);
    }

    public function data(Spa $spa, Service $service, Request $request)
    {
        $client = Client::where('user_id', Auth::id())->firstOrFail();

        // Obtiene los empleados activos disponibles para el spa seleccionado.
        $employees = Employee::where('spa_id', $spa->id)
            ->where('is_active', true)
            ->get(['id', 'name']);

        return response()->json([
            'spa' => $spa,
            'service' => $service,
            'client' => $client,
            'employees' => $employees,
        ]);
    }
}