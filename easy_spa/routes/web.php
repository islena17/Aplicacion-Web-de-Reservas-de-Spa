<?php
use App\Http\Controllers\Api\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;


// Ponemos primero la ruta específica para que Laravel la encuentre de inmediato

Route::get('/migrar-base-de-datos-easyspa', function () {

    try {
        Artisan::call('migrate', ['--force' => true]);

        $outputMigrate = Artisan::output();

        //Ejecutamos los Seeders de la Base de Datos

        Artisan::call('db:seed', ['--force' => true]);

        $outputSeed = Artisan::output();

        return "

            <h1>¡Proceso completado con éxito!</h1>

            <h3>Resultado de las Migraciones:</h3>

            <pre>" . $outputMigrate . "</pre>

            <h3>Resultado del Seeding:</h3>

            <pre>" . $outputSeed . "</pre>";
    } catch (\Exception $e) {

        return "Hubo un error en el proceso: " . $e->getMessage();
    }
});
Route::view('/{any}', 'app')->where('any', '.*');
