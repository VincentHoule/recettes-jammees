<?php

namespace App\Http\Controllers;

use App\Http\Requests\SelectRecipeDetails;
use App\Http\Requests\SelectRecipesAllRequest;
use App\Models\Recipe;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RecipeController extends Controller
{

    /**
     * Retourne le nombre de recette
     */
    public function numRecipe()
    {
        return count(Recipe::all());
    }

    /**
     * Retourne toutes les recettes avec des filtres
     */
    public function selectFilter(SelectRecipesAllRequest $request)
    {
        $research = '.*' . $request->research . '+.*';

        // Page à afficher ex: page 2 = recette 4,5,6
        $min = $request->page * 3 - 3;

        if ($request->research == '' || $request->research == null) {
            $research = '.*[\w]+.*';
        }

        // S'il y a une category
        if ($request->category == null || $request->category == '') {
            return DB::table('recipes')->whereRaw('LOWER(name) REGEXP ?', [$research])->orderBy($request->order, $request->direction)->get();
        } else {
            return DB::table('recipes')->where("category", "=", $request->category)
                ->orderBy($request->order, $request->direction)->get();
        }
    }

    /**
     * Retourne les détails d'une recette comme les étatpes et les ingrédients
     */
    public function detailsRecipe($id)
    {
        $ingredients = DB::table('ingredients')->where('recipe_id', '=', $id)->get();
        $steps = DB::table('steps')->where('recipe_id', '=', $id)->get();
        $results = array(
            'ingredients' => $ingredients,
            'steps' => $steps
        );

        return $results;
    }
}
