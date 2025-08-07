<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;


/**
 * Modèle d'une étape
 */
class Step extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Attributs d'une étape.
     *
     * @var list<string>
     */
    protected $fillable = [
        'recipe_id',
        'description',
        'position',
    ];

    protected $table = 'step';

}
