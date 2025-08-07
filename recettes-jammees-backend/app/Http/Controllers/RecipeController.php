<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRecipeRequest;
use App\Http\Requests\SelectRecipesAllRequest;
use App\Http\Requests\UpdateRecipeRequest;
use App\Models\Ingredient;
use App\Models\Recipe;
use App\Models\Step;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Controlleur de recettes
 */
class RecipeController extends Controller
{

    /**
     * Retourne le nombre de recette
     * @return Object Toutes les recettes
     */
    public function numRecipe()
    {
        return count(Recipe::all());
    }

    /**
     * Retourne toutes les recettes avec des filtres
     * @param SelectRecipesAllRequest Requête contenant des restrictions
     * @return Object Les recettes selon les filtres
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
            return DB::table('recipe')->whereRaw('LOWER(name) REGEXP ?', [$research])->orderBy($request->order, $request->direction)->get();
        } else {
            return DB::table('recipe')->where("category", "=", $request->category)
                ->orderBy($request->order, $request->direction)->get();
        }
    }

    /**
     * Recherche les détails d'une recette. Ses étapes et ingrédients
     * @param Number id de la recette
     * @return Array toutes les ingrédients et les étapes d'une recette
     */
    public function detailsRecipe($id)
    {
        $recipe = DB::table('recipe')->find($id);
        $ingredients = DB::table('ingredient')->where('recipe_id', '=', $id)->get();
        $steps = DB::table('step')->where('recipe_id', '=', $id)->get();
        $results = array(
            'ingredient' => $ingredients,
            'step' => $steps,
            'recipe' => $recipe
        );

        return $results;
    }


    /**
     * Recherche les recettes d'un utilisateur
     * @param Number id de l'utilisateur
     * @return Array les recettes d'un utilisateur
     */
    public function userRecipes($id)
    {
        return DB::table("recipe")->where("user_id", "=", $id)->orderBy("updated_at")->get();
    }

    /**
     * Créer une recette
     * @param CreateRecipeRequest Requête contenant des restrictions
     * @return Jsonresponse État de la création de la recette
     */
    public function createRecipe(CreateRecipeRequest $request)
    {
        DB::beginTransaction();
        $recipe = new Recipe();
        $recipe->name = $request->name;
        $recipe->description = $request->description;
        $recipe->category = $request->category;
        $recipe->image = $request->image;
        $recipe->user_id = $request->user_id;
        $ingredients = json_decode($request->ingredients);
        $steps = json_decode($request->steps);
        try {
            $recipe->save();
        } catch (Exception $exception) {
            DB::rollBack();
            return $exception;
        }
        foreach ($ingredients as $ingredient) {
            $ingredientNew = new Ingredient();
            $ingredientNew->name = $ingredient->name;
            $ingredientNew->quantity = $ingredient->quantity;
            $ingredientNew->unit = $ingredient->unit;
            $ingredientNew->recipe_id = $recipe->id;
            try {
                $ingredientNew->save();
            } catch (Exception $exception) {
                DB::rollBack();
                return $exception;
            }
        }
        foreach ($steps as $step) {
            $stepNew = new Step();
            $stepNew->description = $step->description;
            $stepNew->position = $step->position;
            $stepNew->recipe_id = $recipe->id;
            try {
                $stepNew->save();
            } catch (Exception $exception) {
                DB::rollBack();
                return $exception;
            }
        }
        DB::commit();

        return response()->json([
            'message' => 'La recette a été ajouté'
        ], 200);
    }

    /**
     * Supprime une recette
     * @param id id de la recette
     * @return JsonResponse État de la suppression
     */
    public function deleteRecipe($id)
    {
        $recipe = DB::table('recipe')->find($id);
        if ($recipe == null) {
            return response()->json([
                'message' => 'La recette n\'existe pas.'
            ], 404);
        }


        if (!DB::table('recipe')->delete($id)) {
            return response()->json([
                'message' => 'Échec de la suppression.'
            ], 500);
        }

        return response()->json([
            'message' => 'Réussite de la suppression.'
        ], 200);
    }

    /**
     * Modifie une recette
     * @param UpdateRecipeRequest Requête contenant des restrictions
     * @return JsonResponse État de la modification
     */
    public function ModifyRecipe(UpdateRecipeRequest $request)
    {
        $ingredients = json_decode($request->ingredients);
        $steps = json_decode($request->steps);

        // Modifie la recette
        try {
            DB::table('recipe')->where('id', $request->id)->update([
                "name" => $request->name,
                "description" => $request->description,
                "category" => $request->category,
                "image" => $request->image
            ]);
        } catch (Exception $exception) {
            return $exception;
        }

        // Modifie ou Crée les ingrédients
        foreach ($ingredients as $ingredient) {
            try {

                if (DB::table('ingredient')->where('id', '=', $ingredient->id)->get() == "[]") {
                    $this->CreateIngredient($ingredient, $request->id);
                    Log::debug(DB::table('ingredient')->where('id', '=', $ingredient->id)->get());
                } else {
                    DB::table('ingredient')->where('id', '=', $ingredient->id)->update(
                        [
                            'name' => $ingredient->name,
                            'quantity' => $ingredient->quantity,
                            'unit' => $ingredient->unit,
                        ]
                    );
                }
            } catch (Exception $exception) {

                return $exception;
            }
        }

        // Modifie ou Crée les étapes
        foreach ($steps as $step) {
            try {
                if (DB::table('step')->where('id', '=', $step->id)->get() == "[]") {
                    $this->CreateStep($step, $request->id);
                } else {
                    DB::table('step')->where('id', '=', $step->id)->update(
                        [
                            'description' => $step->description,
                            'position' => $step->position
                        ]
                    );
                }
            } catch (Exception $exception) {
                return $exception;
            }
        }

        return response()->json([
            'message' => 'Réussite de la modification.'
        ], 200);
    }

    /**
     * Créer un ingrédient
     * @param Ingredient Ingredient à créer
     * @param Number Id de la recette
     */
    private function CreateIngredient($ingredient, $id)
    {

        $ingredientNew = new Ingredient();
        $ingredientNew->name = $ingredient->name;
        $ingredientNew->quantity = $ingredient->quantity;
        $ingredientNew->unit = $ingredient->unit;
        $ingredientNew->recipe_id = $id;
        try {
            $ingredientNew->save();
        } catch (Exception $exception) {
            return $exception;
        }
    }

    /**
     * Créer une étape
     * @param Step Étape à créer
     * @param Number Id de la recette
     */
    private function CreateStep($step, $id)
    {
        $stepNew = new Step();
        $stepNew->description = $step->description;
        $stepNew->position = $step->position;
        $stepNew->recipe_id = $id;
        try {
            $stepNew->save();
        } catch (Exception $exception) {
            return $exception;
        }
    }
}
