<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClientRequest;
use App\Models\Client;
use App\Models\Spa;
use Illuminate\Support\Facades\Auth;

class ClientController extends Controller
{
    private function getAdminSpaId(): int
    {
        $spa = Spa::where('user_id', Auth::id())->first();

        if (!$spa) {
            abort(404, 'Este admin no tiene un spa asignado.');
        }

        return $spa->id;
    }

    private function clientBelongsToAdminSpa(Client $client): bool
    {
        $spaId = $this->getAdminSpaId();

        return $client->reservations()
            ->where('spa_id', $spaId)
            ->exists();
    }

    public function index()
    {
        $spaId = $this->getAdminSpaId();

        $clients = Client::with('user')
            ->whereHas('reservations', function ($query) use ($spaId) {
                $query->where('spa_id', $spaId);
            })
            ->orderBy('name')
            ->get();

        return response()->json([
            'data' => $clients,
        ]);
    }

    public function store(ClientRequest $request)
    {
        $data = $request->validated();

        // Si lo crea el admin por teléfono o presencialmente,
        // normalmente no tendrá cuenta asociada.
        if (!array_key_exists('user_id', $data)) {
            $data['user_id'] = null;
        }

        $client = Client::create($data);

        return response()->json([
            'message' => 'Cliente creado correctamente',
            'data' => $client->load('user'),
        ], 201);
    }

    public function show(Client $client)
    {
        if (!$this->clientBelongsToAdminSpa($client)) {
            abort(404);
        }

        return response()->json([
            'data' => $client->load('user'),
        ]);
    }

    public function update(ClientRequest $request, Client $client)
    {
        if (!$this->clientBelongsToAdminSpa($client)) {
            abort(404);
        }

        $data = $request->validated();

        $client->update($data);

        return response()->json([
            'message' => 'Cliente actualizado correctamente',
            'data' => $client->load('user'),
        ]);
    }

}
