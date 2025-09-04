<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);

// Product routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Category routes
Route::get('/categories', [App\Http\Controllers\CategoryController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    // Protected product routes
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    
    // Protected category routes
    Route::post('/categories', [App\Http\Controllers\CategoryController::class, 'store']);
    Route::put('/categories/{id}', [App\Http\Controllers\CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [App\Http\Controllers\CategoryController::class, 'destroy']);
});
