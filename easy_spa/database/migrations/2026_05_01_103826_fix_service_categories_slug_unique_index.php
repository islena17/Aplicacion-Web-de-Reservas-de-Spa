<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('service_categories', function (Blueprint $table) {
            $table->dropUnique('service_categories_slug_unique');

            $table->unique(['spa_id', 'slug'], 'service_categories_spa_id_slug_unique');
        });
    }

    public function down(): void
    {
        Schema::table('service_categories', function (Blueprint $table) {
            $table->dropUnique('service_categories_spa_id_slug_unique');

            $table->unique('slug', 'service_categories_slug_unique');
        });
    }
};
