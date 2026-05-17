<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;
use App\Models\User;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clients = [
            [
                'name' => 'Lucía',
                'surname' => 'Fernández',
                'email' => 'cliente1@spa.com',
                'telephone' => '611111111',
            ],
            [
                'name' => 'Mario',
                'surname' => 'García',
                'email' => 'cliente2@spa.com',
                'telephone' => '622222222',
            ],
            [
                'name' => 'Sara',
                'surname' => 'López',
                'email' => 'cliente3@spa.com',
                'telephone' => '633333333',
            ],
            [
                'name' => 'Álvaro',
                'surname' => 'Martín',
                'email' => 'cliente4@spa.com',
                'telephone' => '644444444',
            ],
        ];

        foreach ($clients as $clientData) {

            $user = User::where('email', $clientData['email'])->first();

            Client::create([
                'name' => $clientData['name'],
                'surname' => $clientData['surname'],
                'email' => $clientData['email'],
                'telephone' => $clientData['telephone'],
                'user_id' => $user?->id,
            ]);
        }
    }
}