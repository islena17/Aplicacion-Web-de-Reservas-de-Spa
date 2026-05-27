<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SpaSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('spas')->insert([
            [
                'user_id' => 2,
                'name' => 'Relax Paradise Spa',
                'slug' => Str::slug('Relax Paradise Spa'),
                'description' => 'Relax Paradise Spa es un centro de bienestar ubicado en Madrid, especializado en tratamientos de relajación, masajes personalizados y experiencias premium orientadas al descanso físico y mental. Sus instalaciones están diseñadas para crear un ambiente tranquilo y acogedor, ideal para desconectar del estrés diario y disfrutar de servicios de alta calidad.',
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
                'logo' => 'spas/relax.png',
            ],
            [
                'user_id' => 3,
                'name' => 'Zen Balance Spa',
                'slug' => Str::slug('Zen Balance Spa'),
                'description' => 'Zen Balance Spa ofrece una experiencia de relajación integral en Barcelona, combinando masajes, circuitos de agua, sauna y tratamientos corporales en un entorno sereno y equilibrado. Su propuesta está enfocada en recuperar la armonía entre cuerpo y mente, proporcionando servicios pensados para mejorar el bienestar, reducir la tensión y favorecer la desconexión.',
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
                'logo' => 'spas/zen.png',
            ],
            [
                'user_id' => 4,
                'name' => 'Luxury Wellness Spa',
                'slug' => Str::slug('Luxury Wellness Spa'),
                'description' => 'Luxury Wellness Spa es un espacio exclusivo de bienestar y belleza situado en Valencia, orientado a clientes que buscan una experiencia completa y personalizada. El centro combina tratamientos estéticos, rituales de relajación y servicios wellness en instalaciones modernas y cuidadas, ofreciendo un ambiente elegante donde cada detalle está pensado para proporcionar confort, calidad y desconexión.',
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
                'logo' => 'spas/luxury.png',
            ],
        ]);
    }
}