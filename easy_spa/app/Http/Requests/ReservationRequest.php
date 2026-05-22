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
            'client_id' => ['nullable', 'exists:clients,id'],
            'spa_id' => ['sometimes', 'exists:spas,id'],
            'service_id' => ['required', 'exists:services,id'],
            'employee_id' => ['nullable', 'exists:employees,id'],

            'reservation_date' => ['required', 'date'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],

            'number_of_people' => ['required', 'integer', 'min:1'],

            'status' => [
                'sometimes',
                'string',
                Rule::in(['pending', 'confirmed', 'cancelled', 'completed', 'no_show']),
            ],

            'observations' => ['nullable', 'string'],

            'client' => ['nullable', 'array'],
            'client.name' => ['required_without:client_id', 'string', 'max:255'],
            'client.surname' => ['required_without:client_id', 'string', 'max:255'],
            'client.email' => ['nullable', 'email', 'max:255'],
            'client.telephone' => ['nullable', 'string', 'max:255'],
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

            'number_of_people.required' => 'El número de personas es obligatorio.',
            'number_of_people.integer' => 'El número de personas debe ser un número entero.',
            'number_of_people.min' => 'Debe haber al menos una persona en la reserva.',

            'observations.string' => 'Las observaciones deben ser texto.',
        ];
    }
}
