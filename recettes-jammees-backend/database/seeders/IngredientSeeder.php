<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ingredient')->insert([
            [
                'name' => "Pain tranché.",
                'quantity' => 2,
                'unit' => null,
                'recipe_id' => 1
            ],
            [
                'name' => "Fromage tranché.",
                'quantity' => 1,
                'unit' => null,
                'recipe_id' => 1
            ],
            [
                'name' => "Crème Glacée.",
                'quantity' => 3,
                'unit' => "L",
                'recipe_id' => 2
            ],
        ]);
    }
}
