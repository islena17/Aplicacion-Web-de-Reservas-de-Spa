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

}
