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
        $users = User::with(['role', 'client', 'employee'])
            ->latest()
            ->get();

        return response()->json($users);
    }

public function store(Request $request)
{
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

    $role = Role::findOrFail($data['role_id']);
    $roleName = strtolower($role->name);

    if ($roleName === 'admin') {
        $request->validate([
            'admin.spa_id' => ['required', 'exists:spas,id'],
        ]);
    }

    if ($roleName === 'client') {
        $request->validate([
            'client.name' => ['required', 'string', 'max:255'],
            'client.surname' => ['required', 'string', 'max:255'],
            'client.telephone' => ['required', 'string', 'max:20'],
        ]);
    }

    if ($roleName === 'employee') {
        $request->validate([
            'employee.name' => ['required', 'string', 'max:255'],
            'employee.surname' => ['required', 'string', 'max:255'],
            'employee.telephone' => ['required', 'string', 'max:20'],
            'employee.spa_id' => ['required', 'exists:spas,id'],
        ]);
    }

    $user = User::create([
        'role_id' => $data['role_id'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
    ]);

    if ($roleName === 'admin') {
        Spa::where('id', $request->input('admin.spa_id'))
            ->update([
                'user_id' => $user->id,
            ]);
    }

    if ($roleName === 'client') {
        Client::create([
            'user_id' => $user->id,
            'name' => $request->input('client.name'),
            'surname' => $request->input('client.surname'),
            'telephone' => $request->input('client.telephone'),
        ]);
    }

    if ($roleName === 'employee') {
        Employee::create([
            'user_id' => $user->id,
            'spa_id' => $request->input('employee.spa_id'),
            'name' => $request->input('employee.name'),
            'surname' => $request->input('employee.surname'),
            'telephone' => $request->input('employee.telephone'),
        ]);
    }

    return response()->json([
        'message' => 'Usuario creado correctamente',
        'data' => $user->load(['role', 'client', 'employee', 'ownedSpa']),
    ], 201);
}

    public function show(User $user)
    {
        $user->load([
            'role',
            'client.reservations.service.spa',
            'employee.spa',
            'employee.user',
        ]);

        return response()->json([
            'data' => $user,
        ]);
    }
}
