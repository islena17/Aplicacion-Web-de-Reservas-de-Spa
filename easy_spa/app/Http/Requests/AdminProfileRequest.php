<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AdminProfileRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
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
