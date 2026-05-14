<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $query = Service::with(['spa', 'category'])
            ->withCount('reservations')
            ->where('is_active', true)
            ->whereHas('spa', function ($query) {
                $query->where('is_active', true);
            });
        if (request('spa_slug')) {
            $query->whereHas('spa', function ($q) {
                $q->where('slug', request('spa_slug'));
            });
        }

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

    public function latest()
    {
        $services = Service::where('is_active', true)
            ->with('spa:id,name')
            ->latest()
            ->take(4)
            ->get();

        return response()->json($services);
    }
}
