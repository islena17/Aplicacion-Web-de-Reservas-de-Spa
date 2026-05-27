<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this-> call([
            RoleSeeder::class,
            UserSeeder::class,
            SpaSeeder::class,
            ServiceCategorySeeder::class,
            ServiceSeeder::class,
            EmployeeSeeder::class,
            ClientSeeder::class,
            EmployeeBlockSeeder::class,
            EmployeeScheduleSeeder::class,
            ReservationSeeder::class,
            SpaScheduleSeeder::class
        ]
        );

    }
}
