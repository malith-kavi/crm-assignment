<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\NoteController;
use App\Http\Controllers\Api\DashboardController;



Route::post('login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'user']);

    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    
    Route::apiResource('leads', LeadController::class);
    Route::post('leads/{leadId}/notes',[NoteController::class, 'store']);
});