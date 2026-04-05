<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Services\AvailabilityService;
use Illuminate\Http\Request;

class AvailabilityController extends Controller
{
    public function index(Request $request, AvailabilityService $availabilityService)
    {
        $data = $request->validate([
            'spa_id' => ['required', 'integer', 'exists:spas,id'],
            'service_id' => ['required', 'integer', 'exists:services,id'],
            'date' => ['required', 'date'],
            'employee_id' => ['nullable', 'integer', 'exists:employees,id'],
            'interval' => ['nullable', 'integer', 'min:5'],
        ]);

        $slots = $availabilityService->getAvailableSlots(
            $data['spa_id'],
            $data['service_id'],
            $data['date'],
            $data['employee_id'] ?? null,
            $data['interval'] ?? 30
        );

        return response()->json($slots);
    }
}