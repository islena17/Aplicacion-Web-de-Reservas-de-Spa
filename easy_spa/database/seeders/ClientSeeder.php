<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        Client::create([
            'name' => 'Demo',
            'surname' => 'Cliente',
            'email' => 'demo@cliente.com',
            'telephone' => '600000000',
            'user_id' => null, // opcional
        ]);
    }
}