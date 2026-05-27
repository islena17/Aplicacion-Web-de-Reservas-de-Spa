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
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );
        User::updateOrCreate(
            ['email' => 'admin1@spa.com'],
            [
                'role_id' => 2,
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );
        User::updateOrCreate(
            ['email' => 'admin2@spa.com'],
            [
                'role_id' => 2,
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'admin3@spa.com'],
            [
                'role_id' => 2,
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'cliente1@spa.com'],
            [
                'role_id' => 3,
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'cliente2@spa.com'],
            [
                'role_id' => 3,
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'cliente3@spa.com'],
            [
                'role_id' => 3,
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'cliente4@spa.com'],
            [
                'role_id' => 3,
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );
    }
}
