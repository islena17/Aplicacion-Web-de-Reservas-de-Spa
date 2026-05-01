<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
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
        ]);

        $role = Role::findOrFail($data['role_id']);

        if ($role->name === 'admin') {
            $request->validate([
                'admin.spa_id' => ['required', 'exists:spas,id'],
            ]);
        }

        $user = User::create([
            'role_id' => $data['role_id'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        if ($role->name === 'admin') {
            Spa::where('id', $request->input('admin.spa_id'))
                ->update([
                    'user_id' => $user->id,
                ]);
        }

        return response()->json([
            'message' => 'Usuario creado correctamente',
            'data' => $user->load(['role', 'ownedSpa']),
        ], 201);
    }

    public function show(User $user)
    {
        $user->load([
            'role',
            'client',
            'employee.spa',
            'employee.user',
        ]);

        return response()->json([
            'data' => $user,
        ]);
    }
}
