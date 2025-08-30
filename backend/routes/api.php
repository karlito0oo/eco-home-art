<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::middleware('auth:sanctum')->group(function () {
	Route::post('/products', [ProductController::class, 'store']);
	Route::put('/products/{id}', [ProductController::class, 'update']);
	Route::delete('/products/{id}', [ProductController::class, 'destroy']);
});
