<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
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