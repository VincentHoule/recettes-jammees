<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class SelectRecipesAllRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {   
        $order = ['created_at', 'name'];
        $dircetion = ['desc', 'asc'];
        $category = ['repas', 'dessert', 'breuvage', ''];

        return [
            'order' => Rule::in($order),
            'direction' => Rule::in($dircetion),
            'category' => 'nullable',
            'research' => 'string|nullable',

        ];
    }
}