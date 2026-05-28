<?php
use App\Http\Controllers\Api\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::view('/{any}', 'app')->where('any', '.*');
