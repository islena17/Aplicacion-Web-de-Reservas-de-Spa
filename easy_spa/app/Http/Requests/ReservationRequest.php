<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_id' => 'required|exists:clients,id',
            'spa_id' => 'required|exists:spas,id',
            'service_id' => 'required|exists:services,id',
            'employee_id' => 'nullable|exists:employees,id',

            'reservation_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',

            'status' => [
                'sometimes',
                'string',
                Rule::in(['pending', 'confirmed', 'cancelled', 'completed', 'no_show']),
            ],

            'final_price' => 'required|numeric|min:0|max:999999.99',
            'observations' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'client_id.required' => 'El cliente es obligatorio.',
            'client_id.exists' => 'El cliente no existe.',

            'spa_id.required' => 'El spa es obligatorio.',
            'spa_id.exists' => 'El spa no existe.',

            'service_id.required' => 'El servicio es obligatorio.',
            'service_id.exists' => 'El servicio no existe.',

            'employee_id.exists' => 'El empleado no existe.',

            'reservation_date.required' => 'La fecha de la reserva es obligatoria.',
            'reservation_date.date' => 'La fecha de la reserva no es válida.',

            'start_time.required' => 'La hora de inicio es obligatoria.',
            'start_time.date_format' => 'La hora de inicio debe tener formato HH:mm.',

            'end_time.required' => 'La hora de fin es obligatoria.',
            'end_time.date_format' => 'La hora de fin debe tener formato HH:mm.',
            'end_time.after' => 'La hora de fin debe ser posterior a la hora de inicio.',

            'status.string' => 'El estado debe ser texto.',
            'status.in' => 'El estado debe ser pending, confirmed, cancelled o completed.',

            'final_price.required' => 'El precio final es obligatorio.',
            'final_price.numeric' => 'El precio final debe ser un número.',
            'final_price.min' => 'El precio final no puede ser negativo.',
            'final_price.max' => 'El precio final es demasiado alto.',

            'observations.string' => 'Las observaciones deben ser texto.',
        ];
    }
}