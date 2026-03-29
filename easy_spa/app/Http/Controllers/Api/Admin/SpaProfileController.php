<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SpaRequest;
use App\Models\Spa;
use Illuminate\Support\Facades\Auth;

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

        $spa->update($request->validated());

        return response()->json([
            'message' => 'Spa actualizado correctamente',
            'data' => $spa
        ]);
    }
}