<?php

use App\Http\Controllers\Api\Admin\EmployeeBlockController as AdminEmployeeBlockController;
use App\Http\Controllers\Api\Admin\EmployeeController as AdminEmployeeController;
use App\Http\Controllers\Api\Admin\EmployeeScheduleController as AdminEmployeeScheduleController;
use App\Http\Controllers\Api\Admin\ReservationController as AdminReservationController;
use App\Http\Controllers\Api\Admin\ServiceCategoryController as AdminServiceCategoryController;
use App\Http\Controllers\Api\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Api\Admin\SpaProfileController;
use App\Http\Controllers\Api\Admin\SpaScheduleController as AdminSpaScheduleController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Client\ProfileController;
use App\Http\Controllers\Api\Client\SpaController as ClientSpaController;
use App\Http\Controllers\Api\Employee\ClientController as EmployeeClientController;
use App\Http\Controllers\Api\Employee\EmployeeBlockController as EmployeeEmployeeBlockController;
use App\Http\Controllers\Api\Employee\ReservationController as EmployeeReservationController;
use App\Http\Controllers\Api\WebMaster\ClientController;
use App\Http\Controllers\Api\WebMaster\EmployeeBlockController;
use App\Http\Controllers\Api\WebMaster\EmployeeController;
use App\Http\Controllers\Api\WebMaster\EmployeeScheduleController;
use App\Http\Controllers\Api\WebMaster\ReservationController;
use App\Http\Controllers\Api\WebMaster\ServiceCategoryController;
use App\Http\Controllers\Api\WebMaster\ServiceController;
use App\Http\Controllers\Api\WebMaster\SpaController;
use App\Http\Controllers\Api\WebMaster\SpaScheduleController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;


Route::middleware('auth:sanctum')->prefix('auth')->group(function () {
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
        Route::apiResource('employee-schedules', EmployeeScheduleController::class);
        Route::apiResource('employee-blocks', EmployeeBlockController::class);
        Route::apiResource('services', ServiceController::class);
        Route::apiResource('serviceCategory', ServiceCategoryController::class);
        Route::apiResource('clients', ClientController::class);
        Route::apiResource('spa-schedules', SpaScheduleController::class);
        Route::apiResource('reservations', ReservationController::class);
    });

Route::middleware(['auth:sanctum', 'role:Admin'])
    ->prefix('admin')
    ->group(function () {
        Route::apiResource('spa-profile', SpaProfileController::class);
        Route::apiResource('reservations', AdminReservationController::class);
        Route::apiResource('services', AdminServiceController::class);
        Route::apiResource('employees', AdminEmployeeController::class);
        Route::apiResource('spa-schedules', AdminSpaScheduleController::class);
        Route::apiResource('employee-schedules', AdminEmployeeScheduleController::class);
        Route::apiResource('employee-blocks', AdminEmployeeBlockController::class);
        Route::apiResource('service-categories', AdminServiceCategoryController::class);
    });

Route::middleware(['auth:sanctum', 'role:employee'])
    ->prefix('employee')
    ->group(function () {
        Route::apiResource('reservations', EmployeeReservationController::class);
        Route::apiResource('clients', EmployeeClientController::class)->except(['destroy']);
        Route::apiResource('employee-blocks', EmployeeEmployeeBlockController::class);
    });

Route::middleware(['auth:sanctum', 'role:client'])
    ->prefix('client')
    ->group(function () {
        Route::get('profile', [ProfileController::class, 'show']);
        Route::put('profile', [ProfileController::class, 'update']);

        Route::get('spas', [ClientSpaController::class, 'index']);
        Route::get('spas/{spa}', [ClientSpaController::class, 'show']);

        Route::get('services', [ServiceController::class, 'index']);
        Route::get('services/{service}', [ServiceController::class, 'show']);
        
        Route::apiResource('reservations', ReservationController::class);
    });
