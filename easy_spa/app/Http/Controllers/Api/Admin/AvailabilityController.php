<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\AvailabilityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AvailabilityController extends Controller
{
    private function getAdminSpaId(): int
    {
        return Auth::user()->spa->id;
    }

    public function index(Request $request, AvailabilityService $availabilityService)
    {
        $data = $request->validate([
            'service_id' => ['required', 'integer', 'exists:services,id'],
            'date' => ['required', 'date'],
            'employee_id' => ['nullable', 'integer', 'exists:employees,id'],
            'interval' => ['nullable', 'integer', 'min:5'],
        ]);

        $slots = $availabilityService->getAvailableSlots(
            $this->getAdminSpaId(),
            $data['service_id'],
            $data['date'],
            $data['employee_id'] ?? null,
            $data['interval'] ?? 30
        );

        return response()->json($slots);
    }
}