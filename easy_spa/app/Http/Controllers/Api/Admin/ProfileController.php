<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminProfileRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
   public function show()
{
    return response()->json([
        'data' => Auth::user(),
    ]);
}
    /**
     *actualizar el perfil del cliente autenticado
     */
    public function update(AdminProfileRequest $request)
    {
        $data = $request->validated();

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $user->email = $data['email'];

        if (!empty($data['password'])) {
            $user->password = Hash::make($data['password']);
        }

        $user->save();

        return response()->json([
            'message' => 'Perfil actualizado correctamente',
            'data' => $user,
        ]);
    }
}
