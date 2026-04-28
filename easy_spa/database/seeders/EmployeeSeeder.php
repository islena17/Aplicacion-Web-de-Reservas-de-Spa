<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Employee::create([
            'spa_id' => 1, 
            'user_id' => null,

            'name' => 'Demo',
            'surname' => 'Empleado',
            'gender' => 'male',
            'telephone' => '600000000',
            'email' => 'demo@empleado.com',
            'specialty' => 'Masajes',
            'timetable_colour' => '#3490dc',
            'is_active' => true,
        ]);
    }
}
