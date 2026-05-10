<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
use App\Models\Spa;
use App\Models\Reservation;

class CalendarController extends Controller
{
    public function index(Spa $spa)
    {
        $reservations = Reservation::with(['client', 'employee', 'service'])
            ->where('spa_id', $spa->id)
            ->get();

        return $reservations->map(function ($reservation) {
            return [
                'id' => $reservation->id,
                'title' => optional($reservation->service)->name . ' - ' . optional($reservation->client)->name,
                'start' => $reservation->reservation_date . 'T' . $reservation->start_time,
                'end' => $reservation->reservation_date . 'T' . $reservation->end_time,

                'backgroundColor' => optional($reservation->employee)->timetable_colour ?? '#3788d8',
                'borderColor' => optional($reservation->employee)->timetable_colour ?? '#3788d8',

                'extendedProps' => [
                    'cliente' => optional($reservation->client)->name,
                    'empleado' => trim(
                        (optional($reservation->employee)->name ?? '') . ' ' .
                        (optional($reservation->employee)->surname ?? '')
                    ),
                    'servicio' => optional($reservation->service)->name,
                    'estado' => $reservation->status,
                    'precio' => $reservation->final_price,
                    'observaciones' => $reservation->observations,
                ],
            ];
        });
    }
}