<?php

use App\Http\Controllers\Api\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

// Ponemos primero la ruta específica para que Laravel la encuentre de inmediato
Route::get('/migrar-base-de-datos-easyspa', function () {
    try {
        // Forzamos la ejecución de las migraciones
        Artisan::call('migrate', ['--force' => true]);
        $output = Artisan::output();
        return "¡Migraciones ejecutadas con éxito!<br><pre>" . $output . "</pre>";
    } catch (\Exception $e) {
        return "Hubo un error al migrar: " . $e->getMessage();
    }
});


Route::view('/{any}', 'app')->where('any', '.*');
