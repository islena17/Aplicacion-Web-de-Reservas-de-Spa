<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClientRequest;
use App\Models\Client;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Mostrar el perfil del cliente autenticado
     */
    public function show()
    {
        $client = Client::where('user_id', Auth::id())->first();

        if (!$client) {
            return response()->json([
                'message' => 'El perfil del cliente aún no existe',
                'data' => null,
            ], 404);
        }

        return response()->json([
            'data' => $client,
        ]);
    }

    /**
     * Crear o actualizar el perfil del cliente autenticado
     */
    public function update(ClientRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        $client = Client::updateOrCreate(
            ['user_id' => Auth::id()],
            $data
        );

        return response()->json([
            'message' => 'Perfil actualizado correctamente',
            'data' => $client,
        ]);
    }
}