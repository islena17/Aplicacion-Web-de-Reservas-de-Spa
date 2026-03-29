<?php

namespace App\Http\Controllers\Api\Employee;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClientRequest;
use App\Models\Client;
use Illuminate\Support\Facades\Auth;

class ClientController extends Controller
{
    private function getEmployeeSpaId(): int
    {
        return Auth::user()->employee->spa_id;
    }

    private function clientBelongsToEmployeeSpa(Client $client): bool
    {
        $spaId = $this->getEmployeeSpaId();

        return $client->reservations()
            ->where('spa_id', $spaId)
            ->exists();
    }

    public function index()
    {
        $spaId = $this->getEmployeeSpaId();

        $clients = Client::with('user')
            ->whereHas('reservations', function ($query) use ($spaId) {
                $query->where('spa_id', $spaId);
            })
            ->latest()
            ->paginate(10);

        return response()->json($clients);
    }

    public function store(ClientRequest $request)
    {
        $data = $request->validated();

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
        if (!$this->clientBelongsToEmployeeSpa($client)) {
            abort(404);
        }

        return response()->json([
            'data' => $client->load('user'),
        ]);
    }

    public function update(ClientRequest $request, Client $client)
    {
        if (!$this->clientBelongsToEmployeeSpa($client)) {
            abort(404);
        }

        $client->update($request->validated());

        return response()->json([
            'message' => 'Cliente actualizado correctamente',
            'data' => $client->load('user'),
        ]);
    }
}