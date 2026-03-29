<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\WebMaster\EmployeeController;
use App\Http\Controllers\Api\WebMaster\ServiceCategoryController;
use App\Http\Controllers\Api\WebMaster\ServiceController;
use App\Http\Controllers\Api\WebMaster\SpaController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;


Route::middleware('auth:sanctum')->prefix('auth')->group(function() {
Route::get('/user', [AuthController::class, 'user']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/logout-all', [AuthController::class, 'logoutAll']);
});
Route::prefix('auth')->group(function () {
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware(['auth:sanctum', 'role:WebMaster'])
    ->prefix('webmaster')
    ->group(function () {
        Route::apiResource('spas', SpaController::class);
        Route::apiResource('employees', EmployeeController::class);
        Route::apiResource('services', ServiceController::class);
        Route::apiResource('serviceCategory', ServiceCategoryController::class);
    });

