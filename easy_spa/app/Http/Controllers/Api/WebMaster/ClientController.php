<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClientRequest;
use App\Models\Client;
use App\Models\Spa;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Client::query();

        if ($request->filled('spa')) {
            $query->whereHas('reservations.service.spa', function ($q) use ($request) {
                $q->where('slug', $request->spa);
            });
        }

        $clients = $query->paginate(10);

        return response()->json($clients);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ClientRequest $request)
    {
        $client = Client::create($request->validated());

        return response()->json([
            'message' => 'Cliente creado correctamente',
            'data' => $client->load('user')
        ], 201);
    }

    /**
     * Display the specified resource.
     */

    public function show(Spa $spa, Client $client)
    {
        $client->load([
            'user',
            'reservations' => function ($query) use ($spa) {
                $query->where('spa_id', $spa->id)
                    ->latest('reservation_date');
            },
            'reservations.service',
            'reservations.employee.user',
        ]);

        return response()->json([
            'data' => $client,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ClientRequest $request, Client $client)
    {
        $client->update($request->validated());

        return response()->json([
            'message' => 'Cliente actualizado correctamente',
            'data' => $client->load('user')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $client->delete();

        return response()->json([
            'message' => 'Cliente eliminado correctamente'
        ]);
    }
}
