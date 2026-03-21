<?php

use App\Http\Controllers\Api\WebMaster\SpaController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::middleware(['auth:sanctum', 'role:webmaster'])
    ->prefix('webmaster')
    ->group(function () {
        Route::apiResource('spas', SpaController::class);
    });