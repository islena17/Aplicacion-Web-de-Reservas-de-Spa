<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',

            'surname' => 'required|string|max:255',

            'telephone' => 'nullable|string|max:20',

            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore(Auth::id()),
            ],

            'password' => 'nullable|string|min:8',
        ];
    }

    public function messages(): array
    {
        return [

            // NAME
            'name.required' =>
                'El nombre es obligatorio.',

            'name.string' =>
                'El nombre debe ser una cadena de texto.',

            'name.max' =>
                'El nombre no puede superar los 255 caracteres.',


            // SURNAME
            'surname.required' =>
                'El apellido es obligatorio.',

            'surname.string' =>
                'El apellido debe ser una cadena de texto.',

            'surname.max' =>
                'El apellido no puede superar los 255 caracteres.',


            // TELEPHONE
            'telephone.string' =>
                'El teléfono debe ser una cadena de texto.',

            'telephone.max' =>
                'El teléfono no puede superar los 20 caracteres.',


            // EMAIL
            'email.required' =>
                'El correo electrónico es obligatorio.',

            'email.email' =>
                'El correo electrónico debe ser válido.',

            'email.max' =>
                'El correo electrónico no puede superar los 255 caracteres.',

            'email.unique' =>
                'Este correo electrónico ya está en uso.',


            // PASSWORD
            'password.string' =>
                'La contraseña debe ser una cadena de texto.',

            'password.min' =>
                'La contraseña debe tener al menos 8 caracteres.',
        ];
    }
}