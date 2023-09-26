<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PreferencesController;
use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EventController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/event', [EventController::class, 'index']);
Route::post('/event', [EventController::class, 'store']);
Route::post('/event/{event}', [EventController::class, 'update']);
Route::delete('/event/{event}', [EventController::class, 'destroy']);
Route::post('/event/attend/{id}', [EventController::class, 'attendEvent']);
Route::post('/events/attend/payment/{id}', [EventController::class, 'showPaymentOptions']);




Route::post('/register', [AuthController::class, 'register']);
// Route::post('/register-preferences', [PreferencesController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
