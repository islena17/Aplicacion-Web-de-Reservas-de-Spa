<?php

use App\Http\Controllers\Api\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/migrar-base-de-datos-easyspa', function () {
    try {
        // Forzamos el fresh de manera estricta
        Artisan::call('migrate:fresh', [
            '--force' => true,
            '--seed' => true,
            '--drop-views' => true // Añadido para asegurar la limpieza en Postgres
        ]);
        
        $output = Artisan::output();
        
        return "
            <h1>¡Proceso completado con éxito (Fresh + Seed)!</h1>
            <h3>Resultado de la operación:</h3>
            <pre>" . $output . "</pre>
        ";
    } catch (\Exception $e) {
        return "Hubo un error en el proceso: " . $e->getMessage();
    }
});

Route::view('/{any}', 'app')->where('any', '.*');