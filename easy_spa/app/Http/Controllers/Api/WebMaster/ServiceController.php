<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceRequest;
use App\Models\Service;
use App\Models\Spa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Service::with(['spa', 'category'])->latest();

        if ($request->filled('spa')) {
            $spa = Spa::where('slug', $request->spa)->firstOrFail();

            $query->where('spa_id', $spa->id);
        }

        $services = $query->paginate(10);

        return response()->json($services);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(ServiceRequest $request)
    {
        $data = $request->validated();

        // 1. Procesar la imagen antes de crear
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('services', 'public');
        }

        // 2. Crear el servicio con la ruta de la imagen ya incluida
        $service = Service::create($data);

        return response()->json([
            'message' => 'Servicio creado correctamente',
            'data' => $service->load(['spa', 'category']),
        ], 201);
    }
    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        return response()->json([
            'data' => $service->load(['spa', 'category']),
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(ServiceRequest $request, Service $service)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            // 1. Borrar imagen antigua si existe
            if ($service->image) {
                Storage::disk('public')->delete($service->image);
            }

            // 2. Guardar la nueva
            $data['image'] = $request->file('image')->store('services', 'public');
        }

        $service->update($data);

        return response()->json([
            'message' => 'Servicio actualizado correctamente',
            'data' => $service->load(['spa', 'category']),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        $service->delete();

        return response()->json([
            'message' => 'Servicio eliminado correctamente',
        ]);
    }
}
