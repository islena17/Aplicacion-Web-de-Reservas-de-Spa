<?php

namespace Database\Seeders;

use App\Models\SpaSchedule;
use Illuminate\Database\Seeder;

class SpaScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $schedules = [
            // Relax Paradise Spa
            [
                'spa_id' => 1,
                'start_time' => '09:00:00',
                'end_time' => '21:00:00',
            ],

            // Zen Balance Spa
            [
                'spa_id' => 2,
                'start_time' => '10:00:00',
                'end_time' => '22:00:00',
            ],

            // Luxury Wellness Spa
            [
                'spa_id' => 3,
                'start_time' => '08:30:00',
                'end_time' => '20:30:00',
            ],
        ];

        $workingDays = [1, 2, 3, 4, 5];

        foreach ($schedules as $schedule) {
            foreach ($workingDays as $day) {
                SpaSchedule::updateOrCreate(
                    [
                        'spa_id' => $schedule['spa_id'],
                        'day_of_week' => $day,
                    ],
                    [
                        'start_time' => $schedule['start_time'],
                        'end_time' => $schedule['end_time'],
                        'is_working' => true,
                    ]
                );
            }
        }
    }
}