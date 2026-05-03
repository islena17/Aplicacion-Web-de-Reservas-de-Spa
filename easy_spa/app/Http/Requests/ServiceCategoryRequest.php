<?php

namespace App\Http\Requests;

use App\Models\ServiceCategory;
use App\Models\Spa;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ServiceCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $spaParam = $this->route('spa');
        $category = $this->route('category');

        $spa = is_object($spaParam)
            ? $spaParam
            : Spa::where('slug', $spaParam)->firstOrFail();

        return [
            'name' => 'required|string|max:255',

            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('service_categories', 'slug')
                    ->where('spa_id', $spa->id)
                    ->ignore($category, 'slug'),
            ],

            'description' => 'nullable|string',
            'is_active' => 'sometimes|boolean',
            'order' => 'sometimes|integer|min:0',
        ];
    }
    public function messages(): array
    {
        return [

            'name.required' => 'El nombre de la categoría es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no puede superar los 255 caracteres.',

            'slug.string' => 'El slug debe ser una cadena de texto.',
            'slug.max' => 'El slug no puede superar los 255 caracteres.',
            'slug.unique' => 'El slug ya está en uso.',

            'description.string' => 'La descripción debe ser texto.',

            'is_active.boolean' => 'El campo is_active debe ser verdadero o falso.',

            'order.integer' => 'El orden debe ser un número entero.',
            'order.min' => 'El orden no puede ser negativo.',
        ];
    }
}
