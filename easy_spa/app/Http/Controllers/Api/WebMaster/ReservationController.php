<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;
use App\Mail\ReservationMail;
use App\Models\Client;
use App\Models\Reservation;
use App\Models\Service;
use App\Models\Spa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        // Consulta las reservas con sus relaciones principales.
        $query = Reservation::with([
            'client',
            'spa',
            'service',
            'employee'
        ]);

        // Permite filtrar las reservas por spa.
        if ($request->filled('spa')) {
            $query->whereHas('spa', function ($q) use ($request) {
                $q->where('slug', $request->spa);
            });
        }

        $reservations = $query
            ->latest()
            ->paginate(10);

        return response()->json($reservations);
    }

    public function store(ReservationRequest $request)
    {
        // Crea la reserva dentro de una transacción.
        $reservation = DB::transaction(function () use ($request) {
            $data = $request->validated();

            // Obtiene el servicio seleccionado.
            $service = Service::findOrFail($data['service_id']);

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

            // Guarda el precio base y calcula el precio final.
            $data['service_price'] = $service->price;
            $data['final_price'] = Reservation::calculateTotalPrice(
                $service,
                $data['number_of_people']
            );

            // Si no existe cliente, crea uno nuevo con los datos recibidos.
            if (empty($data['client_id']) && isset($data['client'])) {
                $client = Client::create([
                    'name' => $data['client']['name'],
                    'surname' => $data['client']['surname'],
                    'email' => $data['client']['email'] ?? null,
                    'telephone' => $data['client']['telephone'] ?? null,
                ]);

                $data['client_id'] = $client->id;
            }

            // Elimina los datos anidados del cliente antes de crear la reserva.
            unset($data['client']);

            return Reservation::create($data);
        });
        // Envía el correo de confirmación al cliente.
        Mail::to($reservation->client->email)
            ->send(new ReservationMail($reservation));

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
        // Devuelve la reserva con información ampliada de sus relaciones.
        return response()->json([
            'data' => $reservation->load([
                'client.user',
                'service.spa',
                'service.category',
                'employee.user'
            ])
        ]);
    }

    public function update(ReservationRequest $request, Reservation $reservation)
    {
        // Actualiza la reserva con los datos validados.
        $reservation->update($request->validated());

        return response()->json([
            'message' => 'Reserva actualizada correctamente',
            'data' => $reservation->load([
                'client',
                'spa',
                'service',
                'employee'
            ])
        ]);
    }

    public function destroy(Reservation $reservation)
    {
        // Elimina la reserva seleccionada.
        $reservation->delete();

        return response()->json([
            'message' => 'Reserva eliminada correctamente'
        ]);
    }

    public function filter(Request $request)
    {
        // Consulta las reservas junto con sus relaciones.
        $query = Reservation::with([
            'client',
            'spa',
            'service',
            'employee'
        ]);

        // Busca coincidencias en cliente, servicio o spa.
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->whereHas('client', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('surname', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('telephone', 'like', "%{$search}%");
                })
                    ->orWhereHas('service', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('spa', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Filtra por estado de la reserva.
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filtra por spa.
        if ($request->filled('spa')) {
            $query->whereHas('spa', function ($q) use ($request) {
                $q->where('slug', $request->spa);
            });
        }

        // Filtra por fecha de reserva.
        if ($request->filled('date')) {
            $query->whereDate('reservation_date', $request->date);
        }

        $reservations = $query
            ->latest()
            ->paginate(10);

        return response()->json($reservations);
    }

    public function spas()
    {
        // Devuelve los spas necesarios para el filtro global de reservas.
        return response()->json(
            Spa::select('id', 'name', 'slug')
                ->orderBy('name')
                ->get()
        );
    }
}