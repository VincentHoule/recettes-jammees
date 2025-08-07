<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

/**
 * Controlleur d'utilisateur
 */
class UserController extends Controller
{
    /**
     * Fonction qui créer et connecte un utilisateur
     * @param CreateUserRequest Requête contenant des restrictions
     * @return JsonResponse si l'utilisateur n'a pas réussit a été créer
     */
    public function signIn(CreateUserRequest $request)
    {
        $unique = DB::table("user")->where("email", '=', $request->mail)->get();
        if (count($unique) == 1) {
            return response()->json([
                'message' => 'Cette addresse courriel est déjà utilisée.'
            ], 422);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        if ($user->save() == null) {
            return response()->json([
                'message' => 'Il y a eu un problème avec la création du compte.'
            ], 500);
        }
        return $user;
    }

    /**
     * Vérifie si l'addresse courriel et le mot de passe sont valide
     * @param Request requete
     * @return JsonResponse retourne l'utilisateur
     */
    public function login(Request $request)
    {
        $user = DB::table("user")->where("email", "=", $request->email)->limit(1)->get();
        $credentials = request(['email', 'password']);

        if (count($user) == 0) {
            return response()->json([
                'email' => 'Votre addresse courriel n\'existe pas ou contient des erreurs.',
                'password' => ''
            ], 401);
        }
        else if (!Auth::attempt($credentials)) {
            return response()->json([
                'password' => 'Votre mot de passe est incorrecte.',
                'email' => ''
            ], 401);
        }

        return $user;
    }


}
