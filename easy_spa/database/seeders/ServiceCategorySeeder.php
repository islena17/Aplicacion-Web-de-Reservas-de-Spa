<?php

namespace Database\Seeders;

use App\Models\ServiceCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ServiceCategory::create([
            'spa_id' => 1,
            'name' => 'Masajes',
            'slug' => Str::slug('Masajes'),
            'description' => 'Servicios de masajes relajantes y terapéuticos',
            'is_active' => true,
            'order' => 1,
        ]);
        ServiceCategory::create([
            'spa_id' => 2, 
            'name' => 'Masajes',
            'slug' => Str::slug('Masajes'),
            'description' => 'Servicios de masajes relajantes y terapéuticos',
            'is_active' => true,
            'order' => 1,
        ]);
        ServiceCategory::create([
            'spa_id' => 3, 
            'name' => 'Masajes',
            'slug' => Str::slug('Masajes'),
            'description' => 'Servicios de masajes relajantes y terapéuticos',
            'is_active' => true,
            'order' => 1,
        ]);
    }
}
