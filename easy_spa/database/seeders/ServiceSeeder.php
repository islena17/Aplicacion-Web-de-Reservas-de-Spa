<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [

            // SPA 1
            [
                'spa_id' => 1,
                'service_category_id' => 1,
                'name' => 'Masaje Relajante',
                'description' => 'Un masaje relajante de cuerpo completo para aliviar el estrés.',
                'length_minutes' => 60,
                'price' => 49.99,
            ],
            [
                'spa_id' => 1,
                'service_category_id' => 2,
                'name' => 'Circuito Termal',
                'description' => 'Acceso completo al circuito termal y zona wellness.',
                'length_minutes' => 90,
                'price' => 39.99,
            ],
            [
                'spa_id' => 1,
                'service_category_id' => 3,
                'name' => 'Tratamiento Facial',
                'description' => 'Tratamiento facial hidratante y revitalizante.',
                'length_minutes' => 45,
                'price' => 34.99,
            ],

            // SPA 2
            [
                'spa_id' => 2,
                'service_category_id' => 1,
                'name' => 'Masaje Deportivo',
                'description' => 'Masaje orientado a aliviar tensión muscular y recuperación.',
                'length_minutes' => 60,
                'price' => 54.99,
            ],
            [
                'spa_id' => 2,
                'service_category_id' => 2,
                'name' => 'Circuito Premium',
                'description' => 'Experiencia premium con sauna, jacuzzi y baño turco.',
                'length_minutes' => 120,
                'price' => 59.99,
            ],
            [
                'spa_id' => 2,
                'service_category_id' => 3,
                'name' => 'Exfoliación Corporal',
                'description' => 'Tratamiento corporal exfoliante e hidratante.',
                'length_minutes' => 50,
                'price' => 44.99,
            ],

            // SPA 3
            [
                'spa_id' => 3,
                'service_category_id' => 1,
                'name' => 'Masaje Aromaterapia',
                'description' => 'Masaje relajante con aceites esenciales naturales.',
                'length_minutes' => 70,
                'price' => 59.99,
            ],
            [
                'spa_id' => 3,
                'service_category_id' => 2,
                'name' => 'Sesión de Sauna',
                'description' => 'Sesión privada de sauna y relajación.',
                'length_minutes' => 45,
                'price' => 29.99,
            ],
            [
                'spa_id' => 3,
                'service_category_id' => 3,
                'name' => 'Ritual Spa Completo',
                'description' => 'Experiencia completa de bienestar y relajación.',
                'length_minutes' => 150,
                'price' => 89.99,
            ],
        ];

        foreach ($services as $index => $service) {
            Service::create([
                'spa_id' => $service['spa_id'],
                'service_category_id' => $service['service_category_id'],
                'name' => $service['name'],
                'slug' => Str::slug($service['name'] . '-' . $service['spa_id']),
                'description' => $service['description'],
                'image' => null,
                'length_minutes' => $service['length_minutes'],
                'price' => $service['price'],
                'capacity' => 1,
                'requires_employee' => true,
                'is_active' => true,
                'order' => $index + 1,
            ]);
        }
    }
}