<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

/**
 * Modèle d'une recette
 */
class Recipe extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Attributs d'une recette
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'image',
        'user_id',
        'category,'
    ];

    protected $table = 'recipe';

}
