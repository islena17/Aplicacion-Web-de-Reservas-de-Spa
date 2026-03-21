<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'webmaster@spa.com'], 
            [
                'role_id' => 1,
                'password' => Hash::make('123456'),
                'email_verified_at' => now(),
            ]
        );
    }
}