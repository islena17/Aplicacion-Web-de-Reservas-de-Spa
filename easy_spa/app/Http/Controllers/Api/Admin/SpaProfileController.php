<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SpaRequest;
use App\Models\Spa;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class SpaProfileController extends Controller
{

    public function show()
    {
        $spa = Spa::where('user_id', Auth::id())->firstOrFail();

        return response()->json([
            'data' => $spa
        ]);
    }

    public function update(SpaRequest $request)
    {
        $spa = Spa::where('user_id', Auth::id())->firstOrFail();

        $data = $request->validated();

        // GUARDAR LOGO
        if ($request->hasFile('logo')) {

            // borrar logo anterior
            if ($spa->logo) {
                Storage::disk('public')->delete($spa->logo);
            }

            // guardar nuevo logo
            $path = $request->file('logo')->store('spas', 'public');

            // guardar string en BD
            $data['logo'] = $path;
        }

        $spa->update($data);

        return response()->json([
            'message' => 'Spa actualizado correctamente',
            'data' => $spa
        ]);
    }
}
