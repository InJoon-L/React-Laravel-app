<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\JWTAuthController;
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
    Route::get("/user", [JWTAuthController::class, 'user']);
    Route::post("/auth", [JWTAuthController::class, 'auth']);
    Route::post("/register", [JWTAuthController::class, 'register']);
    Route::post("/login", [JWTAuthController::class, 'login']);
    Route::get("/logout", [JWTAuthController::class, 'logout']);
});

Route::prefix("favorite")->group(function () {
    Route::post("/favoriteNumber", [FavoriteController::class, 'favoriteNumber']);
    Route::post("/favorited", [FavoriteController::class, 'favorited']);
    Route::post("/removeFromFavorite", [FavoriteController::class, 'removeFromFavorite']);
    Route::post("/addToFavorite", [FavoriteController::class, 'addToFavorite']);
    Route::post("/getFavoredMovie", [FavoriteController::class, 'getFavoredMovie']);
});

Route::prefix("comment")->group(function () {
    Route::post("/saveComment", [CommentController::class, 'saveComment']);
    Route::post("/updateComment", [CommentController::class, 'updateComment']);
    Route::get("/getComments/{movieId}", [CommentController::class, 'getComments']);
});

Route::get('unauthorized', function() {
    return response()->json([
        'success' => false,
        'message' => 'Unauthorized'
    ], 401);
})->name('api.jwt.unauthorized');
