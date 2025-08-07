<?php

use Illuminate\Support\Facades\Route;


/**
 * Toutes les requêtes concernant les recettes.
 */
Route::group([
    'prefix' => 'recipe',

], function () {
    Route::get('/all', [App\Http\Controllers\RecipeController::class, 'selectFilter'])->withoutMiddleware([Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
    Route::get('/details/{id}', [App\Http\Controllers\RecipeController::class, 'detailsRecipe'])->withoutMiddleware([Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
    Route::get('/myRecipes/{id}', [App\Http\Controllers\RecipeController::class, 'userRecipes'])->withoutMiddleware([Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
    Route::post('/createRecipe', [App\Http\Controllers\RecipeController::class, 'createRecipe'])->withoutMiddleware([Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
    Route::post('/updateRecipe', [App\Http\Controllers\RecipeController::class, 'modifyRecipe'])->withoutMiddleware([Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
    Route::delete('/delete/{id}', [App\Http\Controllers\RecipeController::class, 'deleteRecipe'])->withoutMiddleware([Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
});

/**
 * Toutes les requêtes concernant les utilisateurs.
 */
Route::group([
    'prefix' => 'user',

], function () {
    Route::post('/login', [App\Http\Controllers\UserController::class, 'login'])->withoutMiddleware([Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
    Route::post('/signIn', [App\Http\Controllers\UserController::class, 'signIn'])->withoutMiddleware([Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
});