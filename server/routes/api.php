<?php

use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\MatchingController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\AttendancesController;
use App\Http\Controllers\PreferencesController;
use Spatie\Permission\Middleware\RoleMiddleware;


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
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/events', [EventController::class, 'index']);
    Route::post('/event', [EventController::class, 'store']);
    Route::post('/event/{event}', [EventController::class, 'update']);
    Route::delete('event/{event}', [EventController::class, 'destroy']);
    Route::get('/users', [AuthController::class, 'getAllUsers']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/event', [EventController::class, 'index']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/event/{event}', [EventController::class, 'show']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/preferences', [PreferencesController::class, 'store']);
    Route::post('/profile', [ProfileController::class, 'store']);
    Route::get('/profile/{id}', [ProfileController::class, 'show']);
    Route::post('/profile/{id}', [ProfileController::class, 'update']);
    Route::get('/matching-users', [MatchingController::class, 'getMatches']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/event/attendance/{id}', [AttendancesController::class, 'confirmAttendance']);
    Route::get('/event/attendance/{id}', [AttendancesController::class, 'eventAttendees']);
    Route::get('/event/user/{id}', [AttendancesController::class, 'getEventsForUser']);

});