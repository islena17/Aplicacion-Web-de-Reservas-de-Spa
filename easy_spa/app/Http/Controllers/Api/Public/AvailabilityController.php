<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Reservation;
use App\Models\Service;
use Carbon\Carbon;

class AvailabilityController extends Controller
{
    public function index()
    {
        $service = Service::findOrFail(request('service_id'));
        $date = request('date');

        if (!$date) {
            return response()->json([
                'message' => 'La fecha es obligatoria'
            ], 400);
        }

        $employees = Employee::where('spa_id', $service->spa_id)->get();

        $availableSlots = [];

        foreach ($employees as $employee) {
            $start = Carbon::parse($date . ' 09:00');
            $end = Carbon::parse($date . ' 18:00');

            while ($start->copy()->addMinutes($service->length_minutes) <= $end) {

                $slotEnd = $start->copy()->addMinutes($service->length_minutes);

                $exists = Reservation::where('employee_id', $employee->id)
                    ->where('reservation_date', $date)
                    ->where(function ($q) use ($start, $slotEnd) {
                        $q->whereBetween('start_time', [$start->format('H:i:s'), $slotEnd->format('H:i:s')])
                          ->orWhereBetween('end_time', [$start->format('H:i:s'), $slotEnd->format('H:i:s')]);
                    })
                    ->exists();

                if (!$exists) {
                    $availableSlots[] = [
                        'employee_id' => $employee->id,
                        'start_time' => $start->format('H:i'),
                        'end_time' => $slotEnd->format('H:i'),
                    ];
                }

                $start->addMinutes(30); // intervalo
            }
        }

        return response()->json($availableSlots);
    }
}