<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Spa;

class SpaController extends Controller
{
    public function index()
    {
        $spas = Spa::where('is_active', true)
            ->select('id', 'description', 'name', 'slug', 'city', 'logo')
            ->paginate(10);

        return response()->json($spas);
    }

    public function show(Spa $spa)
    {

        if (!$spa->is_active) {
            abort(404);
        }
        $spa->load([
            'services.category',
            'categories',
        ]);

        return response()->json([
            'data' => $spa
        ]);
    }
}
