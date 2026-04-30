<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'spa_id' => ['required', 'exists:spas,id'],
            'user_id' => [
                'nullable',
                'exists:users,id',
                Rule::unique('employees', 'user_id')->ignore($this->route('employee')),
            ],

            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',

            'gender' => 'nullable|in:male,female,other',

            'telephone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',

            'specialty' => 'nullable|string|max:255',

            'timetable_colour' => [
                'nullable',
                'string',
                'max:20',
                'regex:/^#([A-Fa-f0-9]{6})$/'
            ],

            'is_active' => 'sometimes|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.exists' => 'El usuario no existe.',
            'user_id.unique' => 'Este usuario ya está asignado a otro empleado.',

            'name.required' => 'El nombre es obligatorio.',
            'surname.required' => 'El apellido es obligatorio.',

            'gender.in' => 'El género debe ser male, female u other.',

            'email.email' => 'El email debe ser válido.',

            'timetable_colour.regex' => 'El color debe estar en formato hexadecimal (#FFFFFF).',

            'is_active.boolean' => 'El campo activo debe ser verdadero o falso.',
        ];
    }
}
