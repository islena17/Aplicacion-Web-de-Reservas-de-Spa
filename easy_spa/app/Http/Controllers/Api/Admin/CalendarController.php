<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Spa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CalendarController extends Controller
{

 private function getAdminSpaId(): int
    {
        $spa = Spa::where('user_id', Auth::id())->first();

        if (!$spa) {
            abort(404, 'Este admin no tiene un spa asignado.');
        }

        return $spa->id;
    }


public function index()
{

    $spaId = $this->getAdminSpaId();


    $reservations = Reservation::with(['client', 'employee', 'service'])
        ->where('spa_id', $spaId)
        ->get();

    return $reservations->map(function ($reservation) {
        return [
            'id' => $reservation->id,
            'title' => $reservation->service->name . ' - ' . $reservation->client->name,
            'start' => $reservation->reservation_date . 'T' . $reservation->start_time,
            'end' => $reservation->reservation_date . 'T' . $reservation->end_time,
            'color' => $reservation->employee->timetable_colour ?? '#3788d8',
            'extendedProps' => [
                'cliente' => $reservation->client->name,
                'empleado' => $reservation->employee->name,
                'servicio' => $reservation->service->name,
                'estado' => $reservation->status,
                'precio' => $reservation->final_price,
                'observaciones' => $reservation->observations,
            ],
        ];
    });
}
}
