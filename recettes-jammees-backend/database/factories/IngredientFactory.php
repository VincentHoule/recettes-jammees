<?php

namespace Database\Factories;

use App\Models\Recipe;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Créateur d'ingrédient
 */
class IngredientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'quantity'=> fake()->randomFloat(),
            'unit' => "g",
            'recipe_id' => Recipe::factory()
        ];
    }
}
