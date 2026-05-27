<?php

namespace Database\Seeders;

use App\Models\EmployeeSchedule;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class EmployeeScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $employeeSchedules = [
            // SPA 1
            [
                'employee_id' => 1, // Carlos
                'start_time' => '09:00:00',
                'end_time' => '17:00:00',
            ],
            [
                'employee_id' => 2, // Laura
                'start_time' => '13:00:00',
                'end_time' => '21:00:00',
            ],

            // SPA 2
            [
                'employee_id' => 4, // Marta
                'start_time' => '10:00:00',
                'end_time' => '18:00:00',
            ],
            [
                'employee_id' => 5, // Javier
                'start_time' => '14:00:00',
                'end_time' => '22:00:00',
            ],

            // SPA 3
            [
                'employee_id' => 7, // Sergio
                'start_time' => '08:30:00',
                'end_time' => '16:30:00',
            ],
            [
                'employee_id' => 9, // Pablo
                'start_time' => '12:30:00',
                'end_time' => '20:30:00',
            ],
        ];

        /*
            Creamos horarios para los próximos 30 días,
            solo de lunes a viernes.

            dayOfWeek en Carbon:
            1 = Lunes
            2 = Martes
            3 = Miércoles
            4 = Jueves
            5 = Viernes
            6 = Sábado
            0 = Domingo
        */

        for ($i = 0; $i < 30; $i++) {
            $date = Carbon::today()->addDays($i);

            if (!$date->isWeekday()) {
                continue;
            }

            foreach ($employeeSchedules as $schedule) {
                EmployeeSchedule::updateOrCreate(
                    [
                        'employee_id' => $schedule['employee_id'],
                        'date' => $date->format('Y-m-d'),
                    ],
                    [
                        'day_of_week' => $date->dayOfWeekIso,
                        'start_time' => $schedule['start_time'],
                        'end_time' => $schedule['end_time'],
                        'is_working' => true,
                    ]
                );
            }
        }
    }
}