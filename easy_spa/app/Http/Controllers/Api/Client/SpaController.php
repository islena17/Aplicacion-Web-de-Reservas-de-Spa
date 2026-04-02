<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Spa;
use Illuminate\Http\Request;

class SpaController extends Controller
{

    public function index()
    {
        $spas = Spa::where('is_active', true)
            ->latest()
            ->paginate(10);
        return response()->json($spas);
    }

    public function show(Spa $spa)
    {
        if (!$spa->is_active) {
            abort(404);
        }

        return response()->json([
            'data' => $spa
        ]);
    }
}
