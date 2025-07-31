<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StepSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('steps')->insert([
            [
                'recipe_id' => 1,
                'description' => "Étaller du beurre sur un des cotés des deux tranches de pain.",
                'position' => 1,
            ],
            [
                'recipe_id' => 1,
                'description' => "Mettre le fromage en tranche entre les deux pains.",
                'position' => 2,
            ],
            [
                'recipe_id' => 1,
                'description' => "Étaller du beurre sur le dessus du Gill-Cheese",
                'position' => 3,
            ],
            [
                'recipe_id' => 1,
                'description' => "Prendre une pôle sur le four et faire chauffer à medium.",
                'position' => 4,
            ],
            [
                'recipe_id' => 1,
                'description' => "Mettre le Grill-Cheese sur la pôle et mettre du beurre sur l'autre côté du Grill-Cheese.",
                'position' => 5,
            ],
            [
                'recipe_id' => 1,
                'description' => "Attendre qu'un coté soit griller et le retourner.",
                'position' => 6,
            ],
            [
                'recipe_id' => 2,
                'description' => "Prendre la crème glacée et prendre un boule de crème glacé.",
                'position' => 1,
            ],
                        [
                'recipe_id' => 2,
                'description' => "Déposer la boule dans un bol. Répéter au besoin.",
                'position' => 2,
            ],
        ]);
    }
}
