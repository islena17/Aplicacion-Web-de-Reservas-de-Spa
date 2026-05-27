<?php

use App\Http\Controllers\Api\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/migrar-base-de-datos-easyspa', function () {
    try {
        // Ejecutamos el fresh y el seed juntos en un solo comando
        Artisan::call('migrate:fresh', [
            '--force' => true,
            '--seed' => true // <-- Esto ejecuta los seeders de forma segura en el mismo flujo
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