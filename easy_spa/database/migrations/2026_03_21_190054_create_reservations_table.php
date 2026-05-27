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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('spa_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('service_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('employee_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->date('reservation_date');
            $table->time('start_time');
            $table->time('end_time');

            $table->enum('status', [
                'pending',
                'confirmed',
                'cancelled',
                'completed',
                'no_show',
            ])->default('pending');

            $table->decimal('final_price', 8, 2)->nullable();
            $table->text('observations')->nullable();

            $table->timestamps();

            $table->index(['reservation_date', 'start_time']);
            $table->index(['employee_id', 'reservation_date']);
            $table->index(['client_id', 'reservation_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
