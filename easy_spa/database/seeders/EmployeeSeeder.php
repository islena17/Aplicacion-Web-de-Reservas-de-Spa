<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = [

            // SPA 1
            [
                'spa_id' => 1,
                'name' => 'Carlos',
                'surname' => 'Martínez',
                'gender' => 'male',
                'telephone' => '600000001',
                'email' => 'carlos@spa1.com',
                'specialty' => 'Masajes',
                'timetable_colour' => '#3490dc',
            ],
            [
                'spa_id' => 1,
                'name' => 'Laura',
                'surname' => 'Gómez',
                'gender' => 'female',
                'telephone' => '600000002',
                'email' => 'laura@spa1.com',
                'specialty' => 'Tratamientos faciales',
                'timetable_colour' => '#e83e8c',
            ],
            [
                'spa_id' => 1,
                'name' => 'David',
                'surname' => 'Ruiz',
                'gender' => 'male',
                'telephone' => '600000003',
                'email' => 'david@spa1.com',
                'specialty' => 'Circuitos termales',
                'timetable_colour' => '#38c172',
            ],

            // SPA 2
            [
                'spa_id' => 2,
                'name' => 'Marta',
                'surname' => 'López',
                'gender' => 'female',
                'telephone' => '600000004',
                'email' => 'marta@spa2.com',
                'specialty' => 'Masajes deportivos',
                'timetable_colour' => '#ffed4a',
            ],
            [
                'spa_id' => 2,
                'name' => 'Javier',
                'surname' => 'Sánchez',
                'gender' => 'male',
                'telephone' => '600000005',
                'email' => 'javier@spa2.com',
                'specialty' => 'Exfoliaciones',
                'timetable_colour' => '#9561e2',
            ],
            [
                'spa_id' => 2,
                'name' => 'Elena',
                'surname' => 'Torres',
                'gender' => 'female',
                'telephone' => '600000006',
                'email' => 'elena@spa2.com',
                'specialty' => 'Wellness',
                'timetable_colour' => '#f66d9b',
            ],

            // SPA 3
            [
                'spa_id' => 3,
                'name' => 'Sergio',
                'surname' => 'Navarro',
                'gender' => 'male',
                'telephone' => '600000007',
                'email' => 'sergio@spa3.com',
                'specialty' => 'Aromaterapia',
                'timetable_colour' => '#6cb2eb',
            ],
            [
                'spa_id' => 3,
                'name' => 'Ana',
                'surname' => 'Castro',
                'gender' => 'female',
                'telephone' => '600000008',
                'email' => 'ana@spa3.com',
                'specialty' => 'Sauna y relajación',
                'timetable_colour' => '#ff851b',
            ],
            [
                'spa_id' => 3,
                'name' => 'Pablo',
                'surname' => 'Herrera',
                'gender' => 'male',
                'telephone' => '600000009',
                'email' => 'pablo@spa3.com',
                'specialty' => 'Rituales spa',
                'timetable_colour' => '#20c997',
            ],
        ];

        foreach ($employees as $employee) {
            Employee::create([
                'spa_id' => $employee['spa_id'],
                'user_id' => null,

                'name' => $employee['name'],
                'surname' => $employee['surname'],
                'gender' => $employee['gender'],
                'telephone' => $employee['telephone'],
                'email' => $employee['email'],
                'specialty' => $employee['specialty'],
                'timetable_colour' => $employee['timetable_colour'],
                'is_active' => true,
            ]);
        }
    }
}