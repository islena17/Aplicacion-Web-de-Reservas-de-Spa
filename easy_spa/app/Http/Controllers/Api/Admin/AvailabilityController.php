<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Spa;
use App\Services\AvailabilityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AvailabilityController extends Controller
{
 private function getAdminSpaId(): int
    {
        $spa = Spa::where('user_id', Auth::id())->first();

        if (!$spa) {
            abort(404, 'Este admin no tiene un spa asignado.');
        }

        return $spa->id;
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