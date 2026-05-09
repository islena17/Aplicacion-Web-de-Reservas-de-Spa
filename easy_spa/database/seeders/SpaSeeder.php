<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SpaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('spas')->insert([
            [
                'user_id' => 2,
                'name' => 'Relax Paradise Spa',
                'slug' => Str::slug('Relax Paradise Spa'),
                'description' => 'Centro de relajación y bienestar con tratamientos premium.',
                'address' => 'Calle Mayor 12',
                'city' => 'Madrid',
                'postal_code' => '28001',
                'phone' => '600111222',
                'email' => 'info@relaxparadise.com',
                'opening_time' => '09:00:00',
                'closing_time' => '21:00:00',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'name' => 'Zen Balance Spa',
                'slug' => Str::slug('Zen Balance Spa'),
                'description' => 'Masajes, sauna y experiencias de relajación total.',
                'address' => 'Avenida del Mar 45',
                'city' => 'Barcelona',
                'postal_code' => '08001',
                'phone' => '611333444',
                'email' => 'contacto@zenbalance.com',
                'opening_time' => '10:00:00',
                'closing_time' => '22:00:00',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 4,
                'name' => 'Luxury Wellness Spa',
                'slug' => Str::slug('Luxury Wellness Spa'),
                'description' => 'Experiencias exclusivas de bienestar y belleza.',
                'address' => 'Paseo Central 88',
                'city' => 'Valencia',
                'postal_code' => '46001',
                'phone' => '622555666',
                'email' => 'hello@luxurywellness.com',
                'opening_time' => '08:30:00',
                'closing_time' => '20:30:00',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
