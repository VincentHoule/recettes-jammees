<?php

use Illuminate\Support\Facades\Route;

/**
 * Toutes les requêtes concernant les recettes.
 */
Route::group([
    'prefix' => 'recipe',

], function () {
    Route::get('/all', [App\Http\Controllers\RecipeController::class, 'selectFilter']);
    Route::get('/details/{id}', [App\Http\Controllers\RecipeController::class, 'detailsRecipe']);

});

/**
 * Toutes les requêtes concernant les utilisateurs.
 */
Route::group([
    'prefix' => 'user',

], function () {
    Route::post('/login', [App\Http\Controllers\UserController::class, 'login']);
    Route::post('/signIn', [App\Http\Controllers\UserController::class, 'signIn']);
});