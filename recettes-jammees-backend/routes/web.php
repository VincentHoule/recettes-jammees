<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'recipe',

], function () {
    Route::get('/all', [App\Http\Controllers\RecipeController::class, 'selectFilter']);
    Route::get('/details/{id}', [App\Http\Controllers\RecipeController::class, 'detailsRecipe']);


});
