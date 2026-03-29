<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeScheduleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'employee_id' => 'required|exists:employees,id',

            'day_of_week' => 'required|integer|min:0|max:6',

            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',

            'is_working' => 'sometimes|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'employee_id.required' => 'El empleado es obligatorio.',
            'employee_id.exists' => 'El empleado no existe.',

            'day_of_week.required' => 'El día de la semana es obligatorio.',
            'day_of_week.integer' => 'El día debe ser un número.',
            'day_of_week.min' => 'El día debe estar entre 0 (domingo) y 6 (sábado).',
            'day_of_week.max' => 'El día debe estar entre 0 (domingo) y 6 (sábado).',

            'start_time.required' => 'La hora de inicio es obligatoria.',
            'start_time.date_format' => 'La hora de inicio debe tener formato HH:mm.',

            'end_time.required' => 'La hora de fin es obligatoria.',
            'end_time.date_format' => 'La hora de fin debe tener formato HH:mm.',
            'end_time.after' => 'La hora de fin debe ser posterior a la hora de inicio.',

            'is_working.boolean' => 'El campo is_working debe ser verdadero o falso.',
        ];
    }
}