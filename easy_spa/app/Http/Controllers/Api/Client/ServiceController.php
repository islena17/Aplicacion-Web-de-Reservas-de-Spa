<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Service;

class ServiceController extends Controller
{
    /**
     * Listar servicios activos
     */
    public function index()
    {
        $query = Service::with(['spa', 'serviceCategory'])
            ->where('is_active', true)
            ->whereHas('spa', function ($query) {
                $query->where('is_active', true);
            });

        if (request('spa_id')) {
            $query->where('spa_id', request('spa_id'));
        }

        if (request('service_category_id')) {
            $query->where('service_category_id', request('service_category_id'));
        }

        $services = $query
            ->orderBy('order')
            ->paginate(10);

        return response()->json($services);
    }

    /**
     * Mostrar detalle de un servicio
     */
    public function show(Service $service)
    {
        if (
            !$service->is_active ||
            !$service->spa ||
            !$service->spa->is_active
        ) {
            abort(404);
        }

        return response()->json([
            'data' => $service->load(['spa', 'serviceCategory'])
        ]);
    }
}