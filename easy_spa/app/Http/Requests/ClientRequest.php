<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => [
                'nullable',
                'exists:users,id',
                Rule::unique('clients', 'user_id')->ignore($this->route('client')),
            ],

            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'telephone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.exists' => 'El usuario seleccionado no existe.',
            'user_id.unique' => 'Este usuario ya está asociado a otro cliente.',

            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no puede superar los 255 caracteres.',

            'surname.required' => 'El apellido es obligatorio.',
            'surname.string' => 'El apellido debe ser una cadena de texto.',
            'surname.max' => 'El apellido no puede superar los 255 caracteres.',

            'telephone.string' => 'El teléfono debe ser una cadena de texto.',
            'telephone.max' => 'El teléfono no puede superar los 20 caracteres.',

            'email.email' => 'El correo electrónico debe ser válido.',
            'email.max' => 'El correo electrónico no puede superar los 255 caracteres.',
        ];
    }
}