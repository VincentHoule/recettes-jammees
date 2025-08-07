<?php

namespace Database\Factories;

use App\Models\Recipe;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Créateur d'étape
 */
class StepFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "recipe_id" => Recipe::factory(),
            "description" => fake()->text(15),
            "position" => fake()->randomNumber()
        ];
    }
}
