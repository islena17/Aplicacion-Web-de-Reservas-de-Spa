<?php

namespace App\Http\Requests;

use App\Models\Service;
use App\Models\Spa;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $service = $this->route('service');
        $spaId = $this->input('spa_id');

        if (!$spaId) {
            $spaId = Spa::where('user_id', Auth::id())->value('id');
        }

        if (!$spaId) {
            abort(404, 'Este admin no tiene un spa asignado.');
        }

        if (! $service instanceof Service) {
            $service = Service::where('slug', $service)
                ->where('spa_id', $spaId)
                ->first();
        }

        return [
            'spa_id' => 'sometimes|exists:spas,id',
            'service_category_id' => 'required|exists:service_categories,id',
            'name' => 'required|string|max:255',

            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('services', 'slug')
                    ->where(fn($query) => $query->where('spa_id', $spaId))
                    ->ignore($service?->id),
            ],

            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'length_minutes' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'capacity' => 'sometimes|integer|min:1',
            'requires_employee' => 'sometimes|boolean',
            'is_active' => 'sometimes|boolean',
            'order' => 'sometimes|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [

            'service_category_id.required' => 'La categoría es obligatoria.',
            'service_category_id.exists' => 'La categoría no existe.',

            'name.required' => 'El nombre del servicio es obligatorio.',
            'name.max' => 'El nombre no puede superar los 255 caracteres.',

            'slug.unique' => 'El slug ya está en uso.',

            'length_minutes.required' => 'La duración es obligatoria.',
            'length_minutes.integer' => 'La duración debe ser un número entero.',
            'length_minutes.min' => 'La duración mínima es 1 minuto.',
            'length_minutes.max' => 'La duración no puede superar 1440 minutos.',

            'price.required' => 'El precio es obligatorio.',
            'price.numeric' => 'El precio debe ser un número.',
            'price.min' => 'El precio no puede ser negativo.',

            'capacity.integer' => 'La capacidad debe ser un número entero.',
            'capacity.min' => 'La capacidad mínima es 1.',

            'requires_employee.boolean' => 'Debe ser verdadero o falso.',

            'is_active.boolean' => 'Debe ser verdadero o falso.',

            'order.integer' => 'El orden debe ser un número entero.',
            'order.min' => 'El orden no puede ser negativo.',
        ];
    }
}
