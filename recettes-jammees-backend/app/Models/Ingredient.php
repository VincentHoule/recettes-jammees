<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

/**
 * Modèle d'ingrédient
 */
class Ingredient extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Attributs d'un ingrédient.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'quantity',
        'unit',
        'recipe_id'
    ];

    protected $table = 'ingredient';

}
