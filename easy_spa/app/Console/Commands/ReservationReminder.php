<?php

namespace App\Console\Commands;

use App\Mail\ReservationReminderMail;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class ReservationReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:reservation-reminder';

    public function handle()
    {
        $start = Carbon::tomorrow()->startOfDay();
        $end = Carbon::tomorrow()->endOfDay();

        $this->info("START: $start");
        $this->info("END: $end");

        $reservas = Reservation::whereBetween('start_time', [$start, $end])
            ->where('reminder_sent', false)
            ->get();

        $this->info("RESERVAS: " . $reservas->count());

        foreach ($reservas as $reserva) {

            if (empty($reserva->client->email)) {
                $this->warn("Reserva {$reserva->id} sin usuario o sin email");
                continue;
            }

            $this->info("EMAIL: " . $reserva->client->email);

            Mail::to($reserva->client->email)
                ->send(new ReservationReminderMail($reserva));

            $reserva->update([
                'reminder_sent' => true
            ]);
        }
    }
}
