<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;

use App\Models\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    /**
     * Mostrar el perfil del cliente autenticado
     */
    public function show()
    {
        $client = Client::with(['user', 'reservations.service', 'reservations.employee'])
            ->where('user_id', Auth::id())->first();

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
     *actualizar el perfil del cliente autenticado
     */
    public function update(UpdateProfileRequest $request)
    {
        $data = $request->validated();

        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($request->filled('email')) {
            $user->update([
                'email' => $request->input('email'),
            ]);
        }

        if ($request->filled('password')) {
            $user->update([
                'password' => Hash::make($request->input('password')),
            ]);
        }

        $client = Client::updateOrCreate(
            ['user_id' => Auth::id()],
            [
                'user_id' => Auth::id(),
                'name' => $request->input('name'),
                'surname' => $request->input('surname'),
                'telephone' => $request->input('telephone'),
                'email' => $request->input('email'),
            ]
        );

        return response()->json([
            'message' => 'Perfil actualizado correctamente',
            'data' => $client->load('user'),
        ]);
    }
}
