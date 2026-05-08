<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;
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

class ReservationController extends Controller
{
    private function getAuthenticatedClient(): Client
    {
        return Client::where('user_id', Auth::id())->firstOrFail();
    }

    public function index()
    {
        $client = $this->getAuthenticatedClient();

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

        $service = Service::where('is_active', true)
            ->findOrFail($data['service_id']);

        $employeeId = $data['employee_id'] ?? null;

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

        $reservation = DB::transaction(function () use ($data, $client, $service, $employeeId) {
            $reservation = Reservation::create([
                ...$data,
                'client_id' => $client->id,
                'spa_id' => $service->spa_id,
                'status' => 'pending',
                'final_price' => $service->price,
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

    public function show(Reservation $reservation)
    {
        $client = $this->getAuthenticatedClient();

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

        if ($reservation->client_id !== $client->id) {
            abort(404);
        }

        $data = $request->validated();

        unset($data['client_id'], $data['spa_id']);

        if (isset($data['service_id'])) {
            $service = Service::where('is_active', true)
                ->findOrFail($data['service_id']);

            $data['spa_id'] = $service->spa_id;

            if (!empty($data['employee_id'])) {
                Employee::where('spa_id', $service->spa_id)
                    ->findOrFail($data['employee_id']);
            }
        } elseif (!empty($data['employee_id'])) {
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
