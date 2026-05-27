<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reservation;
use Carbon\Carbon;

class ReservationSeeder extends Seeder
{
    public function run(): void
    {
        $reservations = [
            // SPA 1
            [
                'client_id' => 1,
                'spa_id' => 1,
                'service_id' => 1, // Masaje Relajante
                'employee_id' => 1, // Carlos
                'reservation_date' => Carbon::today()->addDays(2)->format('Y-m-d'),
                'start_time' => '10:00:00',
                'end_time' => '11:00:00',
                'status' => 'confirmed',
                'final_price' => 49.99,
                'observations' => 'Reserva de masaje relajante.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'client_id' => 2,
                'spa_id' => 1,
                'service_id' => 2, // Circuito Termal
                'employee_id' => null,
                'reservation_date' => Carbon::today()->addDays(3)->format('Y-m-d'),
                'start_time' => '12:00:00',
                'end_time' => '13:30:00',
                'status' => 'confirmed',
                'final_price' => 39.99,
                'observations' => 'Acceso al circuito termal.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'client_id' => 3,
                'spa_id' => 1,
                'service_id' => 3, // Tratamiento Facial
                'employee_id' => 2, // Laura
                'reservation_date' => Carbon::today()->addDays(4)->format('Y-m-d'),
                'start_time' => '16:00:00',
                'end_time' => '16:45:00',
                'status' => 'pending',
                'final_price' => 34.99,
                'observations' => 'Tratamiento facial hidratante.',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // SPA 2
            [
                'client_id' => 1,
                'spa_id' => 2,
                'service_id' => 4, // Masaje en Pareja
                'employee_id' => 4, // Marta
                'reservation_date' => Carbon::today()->addDays(2)->format('Y-m-d'),
                'start_time' => '11:00:00',
                'end_time' => '12:00:00',
                'status' => 'confirmed',
                'final_price' => 54.99,
                'observations' => 'Masaje en pareja.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'client_id' => 2,
                'spa_id' => 2,
                'service_id' => 5, // Circuito Premium
                'employee_id' => null,
                'reservation_date' => Carbon::today()->addDays(5)->format('Y-m-d'),
                'start_time' => '10:00:00',
                'end_time' => '12:00:00',
                'status' => 'confirmed',
                'final_price' => 59.99,
                'observations' => 'Circuito premium con sauna, jacuzzi y baño turco.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'client_id' => 4,
                'spa_id' => 2,
                'service_id' => 6, // Exfoliación Corporal
                'employee_id' => 5, // Javier
                'reservation_date' => Carbon::today()->addDays(6)->format('Y-m-d'),
                'start_time' => '17:00:00',
                'end_time' => '17:50:00',
                'status' => 'pending',
                'final_price' => 44.99,
                'observations' => 'Exfoliación corporal e hidratación.',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // SPA 3
            [
                'client_id' => 1,
                'spa_id' => 3,
                'service_id' => 7, // Masaje Aromaterapia
                'employee_id' => 7, // Sergio
                'reservation_date' => Carbon::today()->addDays(3)->format('Y-m-d'),
                'start_time' => '09:30:00',
                'end_time' => '10:40:00',
                'status' => 'confirmed',
                'final_price' => 59.99,
                'observations' => 'Masaje con aceites esenciales.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'client_id' => 3,
                'spa_id' => 3,
                'service_id' => 8, // Sesión de Sauna
                'employee_id' => null,
                'reservation_date' => Carbon::today()->addDays(4)->format('Y-m-d'),
                'start_time' => '13:00:00',
                'end_time' => '13:45:00',
                'status' => 'confirmed',
                'final_price' => 29.99,
                'observations' => 'Sesión privada de sauna.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'client_id' => 4,
                'spa_id' => 3,
                'service_id' => 9, // Ritual Spa Completo
                'employee_id' => 9, // Pablo
                'reservation_date' => Carbon::today()->addDays(7)->format('Y-m-d'),
                'start_time' => '15:00:00',
                'end_time' => '17:30:00',
                'status' => 'pending',
                'final_price' => 89.99,
                'observations' => 'Ritual completo de bienestar y relajación.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($reservations as $reservation) {
            Reservation::updateOrCreate(
                [
                    'client_id' => $reservation['client_id'],
                    'spa_id' => $reservation['spa_id'],
                    'service_id' => $reservation['service_id'],
                    'reservation_date' => $reservation['reservation_date'],
                    'start_time' => $reservation['start_time'],
                ],
                $reservation
            );
        }
    }
}
