<?php

namespace Database\Seeders;

use App\Models\EmployeeBlock;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class EmployeeBlockSeeder extends Seeder
{
    public function run(): void
    {
        $blocks = [
            // SPA 1 - Reserva 1
            [
                'employee_id' => 1, // Carlos
                'date' => Carbon::today()->addDays(2)->format('Y-m-d'),
                'start_time' => '10:00:00',
                'end_time' => '11:00:00',
                'reason' => 'Reserva - Masaje Relajante',
                'is_available' => false,
            ],

            // SPA 1 - Reserva 3
            [
                'employee_id' => 2, // Laura
                'date' => Carbon::today()->addDays(4)->format('Y-m-d'),
                'start_time' => '16:00:00',
                'end_time' => '16:45:00',
                'reason' => 'Reserva - Tratamiento Facial',
                'is_available' => false,
            ],

            // SPA 2 - Reserva 1
            [
                'employee_id' => 4, // Marta
                'date' => Carbon::today()->addDays(2)->format('Y-m-d'),
                'start_time' => '11:00:00',
                'end_time' => '12:00:00',
                'reason' => 'Reserva - Masaje en Pareja',
                'is_available' => false,
            ],

            // SPA 2 - Reserva 3
            [
                'employee_id' => 5, // Javier
                'date' => Carbon::today()->addDays(6)->format('Y-m-d'),
                'start_time' => '17:00:00',
                'end_time' => '17:50:00',
                'reason' => 'Reserva - Exfoliación Corporal',
                'is_available' => false,
            ],

            // SPA 3 - Reserva 1
            [
                'employee_id' => 7, // Sergio
                'date' => Carbon::today()->addDays(3)->format('Y-m-d'),
                'start_time' => '09:30:00',
                'end_time' => '10:40:00',
                'reason' => 'Reserva - Masaje Aromaterapia',
                'is_available' => false,
            ],

            // SPA 3 - Reserva 3
            [
                'employee_id' => 9, // Pablo
                'date' => Carbon::today()->addDays(7)->format('Y-m-d'),
                'start_time' => '15:00:00',
                'end_time' => '17:30:00',
                'reason' => 'Reserva - Ritual Spa Completo',
                'is_available' => false,
            ],
        ];

        foreach ($blocks as $block) {
            EmployeeBlock::updateOrCreate(
                [
                    'employee_id' => $block['employee_id'],
                    'date' => $block['date'],
                    'start_time' => $block['start_time'],
                    'end_time' => $block['end_time'],
                ],
                $block
            );
        }
    }
}