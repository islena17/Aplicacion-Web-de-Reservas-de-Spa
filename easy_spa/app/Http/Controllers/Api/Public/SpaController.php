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
        $spa->load([
            'categories' => function ($query) {
                $query->where('is_active', 1)
                    ->orderBy('order');
            },
            'services' => function ($query) {
                $query->where('is_active', 1)
                    ->orderBy('order');
            },
            'services.category',
        ]);

        return response()->json($spa);
    }
}
