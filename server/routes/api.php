<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix("users")->group(function () {
    Route::get("/auth", [])->name("");
    Route::post("/register", [])->name("");
    Route::post("/login", [])->name("");
    Route::get("/logout", [])->name("");
});

Route::prefix("favorite")->group(function () {
    Route::post("/favoriteNumber", [])->name("");
    Route::post("/favorited", [])->name("");
    Route::post("/removeFromFavorite", [])->name("");
    Route::post("/addToFavorite", [])->name("");
    Route::post("/getFavoredMovie", [])->name("");
});

Route::prefix("comment")->group(function () {
    Route::post("/example", [])->name("");
});

Route::prefix("like")->group(function () {
    Route::post("/example", [])->name("");
});

Route::prefix("unlike")->group(function () {
    Route::post("/example", [])->name("");
});

Route::get('unauthorized', function() {
    return response()->json([
        'success' => false,
        'message' => 'Unauthorized'
    ], 401);
})->name('api.jwt.unauthorized');
