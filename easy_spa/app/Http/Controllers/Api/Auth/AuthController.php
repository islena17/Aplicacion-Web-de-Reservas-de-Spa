<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{

//solo sirve para clientes, no sabia donde mas hacer que se creara el "cliente" junto a la cuenta
    public function register(RegisterRequest $request)
{
    $data = DB::transaction(function () use ($request) {
        $user = User::create([
            'email' => $request->email,
            'password' => $request->password,
            'role_id' => 4 //para que siempre sean clientes los que se registren
        ]);

        $client = Client::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'surname' => $request->surname,
            'telephone' => $request->telephone,
            'email' => $user->email,
        ]);

        return [
            'user' => $user,
            'client' => $client,
        ];
    });

    $token = $data['user']->createToken('api-token')->plainTextToken;

    return response()->json([
        'message' => 'Usuario registrado correctamente',
        'token' => $token,
        'user' => $data['user'],
        'client' => $data['client'],
    ], 201);
}

public function login(LoginRequest $request)
{
    $credenciales = [
        'email' => $request->email,
        'password' => $request->password,
    ];

    if (!Auth::attempt($credenciales, $request->boolean('remember'))) {
        return response()->json([
            'message' => 'Credenciales incorrectas'
        ], 401);
    }

    $request->session()->regenerate();

    $user = User::with(['role', 'client'])->find(Auth::id());

    return response()->json([
        'message' => 'Login correcto',
        'user' => $user,
    ]);
}

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Token revocado correctamente',
        ]);
    }

    public function logoutAll(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'message' => 'Todos los tokens han sido revocados',
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
