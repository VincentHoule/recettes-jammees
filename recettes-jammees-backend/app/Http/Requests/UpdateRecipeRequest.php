<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class UpdateRecipeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Règle de validation de la requête
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {   

        return [
            "id" => 'required|exists:recipe,id',
            "name" => 'required|string|min:1',
            "description" => 'required|string|min:1',
            "category" => 'required|string',
            "image" => 'required|string|nullable',
            "user_id" => 'required|integer|exists:user,id',
            "steps" => 'nullable',
            "ingredients" => 'nullable'

        ];
    }
}