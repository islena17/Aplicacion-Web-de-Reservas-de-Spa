<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Service::create([
            'spa_id' => 1, // debe existir
            'service_category_id' => 1, // debe existir

            'name' => 'Masaje Relajante',
            'slug' => Str::slug('Masaje Relajante'),
            'description' => 'Un masaje relajante de cuerpo completo para aliviar el estrés.',
            'image' => null,
            'length_minutes' => 60,
            'price' => 49.99,
            'capacity' => 1,
            'requires_employee' => true,
            'is_active' => true,
            'order' => 1,
        ]);

                Service::create([
            'spa_id' => 2, // debe existir
            'service_category_id' => 2, // debe existir

            'name' => 'Masaje Relajante',
            'slug' => Str::slug('Masaje Relajante'),
            'description' => 'Un masaje relajante de cuerpo completo para aliviar el estrés.',
            'image' => null,
            'length_minutes' => 60,
            'price' => 49.99,
            'capacity' => 1,
            'requires_employee' => true,
            'is_active' => true,
            'order' => 1,
        ]);
        
        
    }
}
