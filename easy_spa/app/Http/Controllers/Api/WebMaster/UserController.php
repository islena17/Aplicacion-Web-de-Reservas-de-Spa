<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Employee;
use App\Models\Role;
use App\Models\Spa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        // Lista los usuarios con sus relaciones principales.
        $users = User::with([
            'role',
            'client',
            'employee.spa',
            'ownedSpa',
        ])
            ->latest()
            ->get();

        return response()->json($users);
    }

    public function store(Request $request)
    {
        // Valida los datos comunes y los posibles datos según el tipo de usuario.
        $data = $request->validate([
            'role_id' => ['required', 'exists:roles,id'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],

            'admin.spa_id' => ['nullable', 'exists:spas,id'],

            'client.name' => ['nullable', 'string', 'max:255'],
            'client.surname' => ['nullable', 'string', 'max:255'],
            'client.telephone' => ['nullable', 'string', 'max:20'],

            'employee.name' => ['nullable', 'string', 'max:255'],
            'employee.surname' => ['nullable', 'string', 'max:255'],
            'employee.telephone' => ['nullable', 'string', 'max:20'],
            'employee.spa_id' => ['nullable', 'exists:spas,id'],
        ]);

        // Obtiene el rol para aplicar validaciones específicas.
        $role = Role::findOrFail($data['role_id']);
        $roleName = strtolower($role->name);

        // Si el usuario es admin, debe tener un spa asignado.
        if ($roleName === 'admin') {
            $request->validate([
                'admin.spa_id' => ['required', 'exists:spas,id'],
            ]);
        }

        // Si el usuario es cliente, sus datos personales son obligatorios.
        if ($roleName === 'client') {
            $request->validate([
                'client.name' => ['required', 'string', 'max:255'],
                'client.surname' => ['required', 'string', 'max:255'],
                'client.telephone' => ['required', 'string', 'max:20'],
            ]);
        }
        // Crea el usuario con la contraseña cifrada.
        $user = User::create([
            'role_id' => $data['role_id'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        // Asigna el spa seleccionado al nuevo administrador.
        if ($roleName === 'admin') {
            Spa::where('id', $request->input('admin.spa_id'))
                ->update([
                    'user_id' => $user->id,
                ]);
        }

        // Crea el perfil de cliente asociado al usuario.
        if ($roleName === 'client') {
            Client::create([
                'user_id' => $user->id,
                'name' => $request->input('client.name'),
                'surname' => $request->input('client.surname'),
                'telephone' => $request->input('client.telephone'),
                'email' => $user->email,
            ]);
        }

        return response()->json([
            'message' => 'Usuario creado correctamente',
            'data' => $user->load(['role', 'client', 'employee', 'ownedSpa']),
        ], 201);
    }

    public function show(User $user)
    {
        // Devuelve el usuario con sus datos relacionados.
        $user->load([
            'role',
            'client.reservations.service.spa',
            'employee.spa',
            'employee.user',
            'ownedSpa'
        ]);

        return response()->json([
            'data' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'role_id' => ['required', 'exists:roles,id'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'password' => ['nullable', 'string', 'min:8'],

            'client.name' => ['nullable', 'string', 'max:255'],
            'client.surname' => ['nullable', 'string', 'max:255'],
            'client.telephone' => ['nullable', 'string', 'max:20'],

            'owned_spa_id' => ['nullable', 'exists:spas,id'],
        ]);

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update([
            'role_id' => $data['role_id'],
            'email' => $data['email'],
            ...isset($data['password']) ? ['password' => $data['password']] : [],
        ]);

        $role = Role::findOrFail($data['role_id']);
        $roleName = strtolower($role->name);

        if ($roleName === 'client' && $request->has('client')) {
            $user->client()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'name' => $request->input('client.name'),
                    'surname' => $request->input('client.surname'),
                    'telephone' => $request->input('client.telephone'),
                    'email' => $user->email,
                ]
            );
        }

        if ($roleName === 'admin' && $request->filled('owned_spa_id')) {
            Spa::where('user_id', $user->id)->update([
                'user_id' => null,
            ]);

            Spa::where('id', $request->owned_spa_id)->update([
                'user_id' => $user->id,
            ]);
        }

        return response()->json([
            'message' => 'Usuario actualizado correctamente',
            'data' => $user->load(['role', 'client', 'employee', 'ownedSpa']),
        ]);
    }

    public function destroy(User $user)
    {
        // Elimina el usuario seleccionado.
        $user->delete();

        return response()->json([
            'message' => 'Usuario eliminado correctamente',
        ]);
    }
}
