<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeBlockRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'employee_id' => 'required|exists:employees,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'reason' => 'nullable|string|max:255',
            'is_available' => 'sometimes|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'employee_id.required' => 'El empleado es obligatorio.',
            'employee_id.exists' => 'El empleado seleccionado no existe.',

            'date.required' => 'La fecha es obligatoria.',
            'date.date' => 'La fecha debe ser válida.',

            'start_time.required' => 'La hora de inicio es obligatoria.',
            'start_time.date_format' => 'La hora de inicio debe tener formato HH:mm.',

            'end_time.required' => 'La hora de fin es obligatoria.',
            'end_time.date_format' => 'La hora de fin debe tener formato HH:mm.',
            'end_time.after' => 'La hora de fin debe ser posterior a la hora de inicio.',

            'reason.string' => 'El motivo debe ser texto.',
            'reason.max' => 'El motivo no puede superar los 255 caracteres.',

            'is_available.boolean' => 'El campo is_available debe ser verdadero o falso.',
        ];
    }
}