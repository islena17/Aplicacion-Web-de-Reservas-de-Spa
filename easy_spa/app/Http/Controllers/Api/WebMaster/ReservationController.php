<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;
use App\Models\Client;
use App\Models\Reservation;
use App\Models\Spa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservations = Reservation::with([
            'client',
            'spa',
            'service',
            'employee'
        ])
            ->latest()
            ->paginate(10);

        return response()->json($reservations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReservationRequest $request)
    {
        $reservation = DB::transaction(function () use ($request) {
            $data = $request->validated();

            if (empty($data['client_id']) && isset($data['client'])) {
                $client = Client::create([
                    'name' => $data['client']['name'],
                    'surname' => $data['client']['surname'],
                    'email' => $data['client']['email'] ?? null,
                    'telephone' => $data['client']['telephone'] ?? null,
                ]);

                $data['client_id'] = $client->id;
            }

            unset($data['client']);

            return Reservation::create($data);
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
        return response()->json([
            'data' => $reservation->load([
                'client.user',
                'service.spa',
                'service.category',
                'employee.user'
            ])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ReservationRequest $request, Reservation $reservation)
    {
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();

        return response()->json([
            'message' => 'Reserva eliminada correctamente'
        ]);
    }

    public function filter(Request $request)
    {
        $query = Reservation::with([
            'client',
            'spa',
            'service',
            'employee'
        ]);

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

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('spa')) {
            $query->whereHas('spa', function ($q) use ($request) {
                $q->where('slug', $request->spa);
            });
        }

        if ($request->filled('date')) {
            $query->whereDate('reservation_date', $request->date);
        }

        $reservations = $query
            ->latest()
            ->paginate(10);

        return response()->json($reservations);
    }

    //metodo para sacar todos los spas para el filtro de reservas globales de wm
    public function spas()
    {
        return response()->json(
            Spa::select('id', 'name', 'slug')
                ->orderBy('name')
                ->get()
        );
    }
}
