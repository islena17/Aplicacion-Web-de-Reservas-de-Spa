<?php

use App\Http\Controllers\Api\Admin\AvailabilityController as AdminAvailabilityController;
use App\Http\Controllers\Api\Admin\CalendarController;
use App\Http\Controllers\Api\Admin\ClientController as AdminClientController;
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
use App\Http\Controllers\Api\Employee\AvailabilityController as EmployeeAvailabilityController;

use App\Http\Controllers\Api\Public\AvailabilityController as PublicAvailabilityController;

use App\Http\Controllers\Api\WebMaster\AvailabilityController;
use App\Http\Controllers\Api\WebMaster\ClientController;
use App\Http\Controllers\Api\WebMaster\EmployeeBlockController;
use App\Http\Controllers\Api\WebMaster\EmployeeController;
use App\Http\Controllers\Api\WebMaster\EmployeeScheduleController;
use App\Http\Controllers\Api\WebMaster\ReservationController;
use App\Http\Controllers\Api\WebMaster\ServiceCategoryController;
use App\Http\Controllers\Api\WebMaster\ServiceController;
use App\Http\Controllers\Api\WebMaster\SpaController;
use App\Http\Controllers\Api\WebMaster\SpaScheduleController;

use App\Http\Controllers\Api\Client\AvailabilityController as ClientAvailabilityController;
use App\Http\Controllers\Api\Client\ReservationController as ClientReservationController;
use App\Http\Controllers\Api\Public\SpaController as PublicSpaController;
use App\Http\Controllers\Api\WebMaster\RoleController;
use App\Http\Controllers\Api\WebMaster\UserController;
use Illuminate\Http\Request;
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
        Route::apiResource('services', ServiceController::class)
            ->except(['update', 'show']);
        Route::get('/services/{service:slug}', [ServiceController::class, 'show']);

        Route::put('/services/{service:slug}', [ServiceController::class, 'update']);
        Route::post('/spas/{spa:slug}/categories', [ServiceCategoryController::class, 'store']);
        Route::get('/spas/{spa:slug}/categories/{category:slug}', [ServiceCategoryController::class, 'show']);
        Route::put('/spas/{spa:slug}/categories/{category:slug}', [ServiceCategoryController::class, 'update']);
        Route::delete('/spas/{spa:slug}/categories/{category:slug}', [
            ServiceCategoryController::class,
            'destroy'
        ]);
        Route::get('/spas/{spa:slug}/clients/{client}', [ClientController::class, 'show']);

        Route::apiResource('clients', ClientController::class)
            ->except(['show']);
        Route::apiResource('spa-schedules', SpaScheduleController::class);
        Route::apiResource('reservations', ReservationController::class);
        Route::apiResource('users', UserController::class);
        Route::get('availability', [AvailabilityController::class, 'index']);
        Route::get('roles', [RoleController::class, 'index']);
    });

Route::middleware(['auth:sanctum', 'role:Admin'])
    ->prefix('admin')
    ->group(function () {
        Route::get('/reservations/calendar', [CalendarController::class, 'index']);
        Route::get('spa-profile', [SpaProfileController::class, 'show']);
        Route::put('spa-profile', [SpaProfileController::class, 'update']);

        Route::apiResource('reservations', AdminReservationController::class);
        Route::apiResource('services', AdminServiceController::class);
        Route::apiResource('employees', AdminEmployeeController::class);
        Route::apiResource('spa-schedules', AdminSpaScheduleController::class);
        Route::apiResource('employee-schedules', AdminEmployeeScheduleController::class);
        Route::post('employee-schedules/bulk', [AdminEmployeeScheduleController::class, 'bulk']);
        Route::apiResource('employee-blocks', AdminEmployeeBlockController::class);
        Route::apiResource('categories', AdminServiceCategoryController::class);
        Route::get('availability', [AdminAvailabilityController::class, 'index']);
        Route::apiResource('clients', AdminClientController::class);
        Route::get('spa-schedules', [AdminSpaScheduleController::class, 'index']);
        Route::post('spa-schedules/bulk', [AdminSpaScheduleController::class, 'bulk']);
    });

Route::middleware(['auth:sanctum', 'role:employee'])
    ->prefix('employee')
    ->group(function () {
        Route::apiResource('reservations', EmployeeReservationController::class);
        Route::apiResource('clients', EmployeeClientController::class)->except(['destroy']);
        Route::apiResource('employee-blocks', EmployeeEmployeeBlockController::class);
        Route::get('availability', [EmployeeAvailabilityController::class, 'index']);
    });

Route::middleware(['auth:sanctum', 'role:Client'])
    ->prefix('client')
    ->group(function () {
        Route::get('profile', [ProfileController::class, 'show']);
        Route::put('profile', [ProfileController::class, 'update']);

        Route::get('spas', [ClientSpaController::class, 'index']);
        Route::get('spas/{spa}', [ClientSpaController::class, 'show']);

        Route::get('services', [ServiceController::class, 'index']);
        Route::get('services/{service}', [ServiceController::class, 'show']);

        Route::apiResource('reservations', ClientReservationController::class);
        Route::get(
            '/reservation-data/{spa:slug}/{service:slug}',
            [ClientReservationController::class, 'data']
        );
        Route::get('availability', [ClientAvailabilityController::class, 'index']);
    });


/*aqui pongo las publicas*/
Route::prefix('public')->group(function () {
    Route::get('availability', [PublicAvailabilityController::class, 'index']);
    Route::get('spas', [PublicSpaController::class, 'index']);
    Route::get('spas/{spa}', [PublicSpaController::class, 'show']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user()->load('role');
});
