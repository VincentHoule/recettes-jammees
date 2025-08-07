<?php

namespace Database\Seeders;

use DateTime;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB as FacadesDB;
use Illuminate\Support\Facades\DB;

class RecipeSeeder extends Seeder
{
    /**
     * Données de base de recettes
     */
    public function run(): void
    {

        DB::table('recipe')->insert([
            [
                'name' => 'Grill-Cheese',
                'description' => 'Un sandwitch chaud au fromage',
                'user_id' => 1,
                'image' => 'https://cdn.loveandlemons.com/wp-content/uploads/2023/01/grilled-cheese.jpg',
                'category' => 'repas',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Crème Glacé',
                'description' => 'Un dessert simple et froid',
                'user_id' => 1,
                'image' => 'https://images.radio-canada.ca/v1/alimentation/recette/16x9/creme-glacee-vanille.jpg',
                'category' => 'dessert',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Whiskey et jus d\'orange',
                'description' => 'Un boisson pour les gens rafininé',
                'user_id' => 1,
                'image' => 'https://www.cocktails-road.fr/images/recipe/2021/03/orange-sir.jpg',
                'category' => 'breuvage',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Soupe',
                'description' => 'Pour les gens pauvre',
                'user_id' => 2,
                'image' => 'https://images.radio-canada.ca/v1/alimentation/recette/1x1/soupe-legumes.jpg',
                'category' => 'repas',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Guimauve Grillé',
                'description' => 'Excellent pour les campings',
                'user_id' => 2,
                'image' => 'https://www.ruerivard.com/wp-content/uploads/2012/08/GuimauveGrillee.jpg',
                'category' => 'dessert',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Fanta',
                'description' => 'Trop sucré pour les mortels',
                'user_id' => 2,
                'image' => 'https://i5.walmartimages.com/asr/beaedc54-0a6a-4552-a13b-ce1be7ab9fc3.3c1b680c1c2a19f0a37915393a25c5f4.jpeg',
                'category' => 'breuvage',
                'created_at' => now(),
                'updated_at' => now()

            ]
        ]);
    }
}
