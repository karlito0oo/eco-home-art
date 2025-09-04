<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);

// Product routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Category routes
Route::get('/categories', [App\Http\Controllers\CategoryController::class, 'index']);

// Article routes
Route::get('/articles', [App\Http\Controllers\ArticleController::class, 'index']);
Route::get('/articles/{article}', [App\Http\Controllers\ArticleController::class, 'show']);

// Testimonial routes
Route::get('/testimonials', [App\Http\Controllers\TestimonialController::class, 'index']);
Route::get('/testimonials/{testimonial}', [App\Http\Controllers\TestimonialController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    // Protected product routes
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::post('/products/featured/reorder', [ProductController::class, 'reorderFeatured']);
    
    // Protected category routes
    Route::post('/categories', [App\Http\Controllers\CategoryController::class, 'store']);
    Route::put('/categories/{id}', [App\Http\Controllers\CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [App\Http\Controllers\CategoryController::class, 'destroy']);

    // Protected article routes
    Route::post('/articles', [App\Http\Controllers\ArticleController::class, 'store']);
    Route::put('/articles/{article}', [App\Http\Controllers\ArticleController::class, 'update']);
    Route::delete('/articles/{article}', [App\Http\Controllers\ArticleController::class, 'destroy']);

    // Protected testimonial routes
    Route::post('/testimonials', [App\Http\Controllers\TestimonialController::class, 'store']);
    Route::put('/testimonials/{testimonial}', [App\Http\Controllers\TestimonialController::class, 'update']);
    Route::delete('/testimonials/{testimonial}', [App\Http\Controllers\TestimonialController::class, 'destroy']);
    Route::post('/testimonials/reorder', [App\Http\Controllers\TestimonialController::class, 'reorder']);
    
    // Upload route
    Route::post('/upload', [App\Http\Controllers\UploadController::class, 'upload']);
});
