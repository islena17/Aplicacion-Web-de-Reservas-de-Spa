<?php

namespace App\Http\Requests;

use App\Models\Spa;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class SpaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $spaId = Spa::where('user_id', Auth::id())->value('id');
        return [

        

            'name' => 'required|string|max:255',

            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('spas', 'slug')->ignore($spaId)
            ],

            'description' => 'nullable|string',

            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',

            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',

            'opening_time' => 'nullable|date_format:H:i',
            'closing_time' => 'nullable|date_format:H:i',

            'logo' => 'nullable|image|max:255',

            'is_active' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [

            'name.required' => 'El nombre del spa es obligatorio.',
            'name.max' => 'El nombre no puede superar los 255 caracteres.',

            'slug.unique' => 'El slug ya está en uso.',

            'email.email' => 'El email debe ser válido.',

            'opening_time.date_format' => 'La hora de apertura debe tener formato HH:mm.',
            'closing_time.date_format' => 'La hora de cierre debe tener formato HH:mm.',

            'is_active.boolean' => 'El campo activo debe ser verdadero o falso.',
        ];
    }
}