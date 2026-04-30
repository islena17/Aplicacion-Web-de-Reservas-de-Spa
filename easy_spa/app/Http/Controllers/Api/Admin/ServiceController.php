<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceRequest;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{
    /**
     * Obtener el spa del admin autenticado
     */
    private function getAdminSpaId(): int
    {
        return Auth::user()->spa->id;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $spaId = $this->getAdminSpaId();

        $services = Service::with(['category'])
            ->where('spa_id', $spaId)
            ->orderBy('order')
            ->get();

        return response()->json($services);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ServiceRequest $request)
    {
        $spaId = $this->getAdminSpaId();

        $service = Service::create([
            ...$request->validated(),
            'spa_id' => $spaId,
        ]);

        return response()->json([
            'message' => 'Servicio creado correctamente',
            'data' => $service->load(['category'])
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        $spaId = $this->getAdminSpaId();

        if ($service->spa_id !== $spaId) {
            abort(404);
        }

        return response()->json([
            'data' => $service->load(['category'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ServiceRequest $request, Service $service)
    {
        $spaId = $this->getAdminSpaId();

        if ($service->spa_id !== $spaId) {
            abort(404);
        }

        $data = $request->validated();

        // 🔒 Evitar que cambien el spa_id
        unset($data['spa_id']);

        $service->update($data);

        return response()->json([
            'message' => 'Servicio actualizado correctamente',
            'data' => $service->load(['serviceCategory'])
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        $spaId = $this->getAdminSpaId();

        if ($service->spa_id !== $spaId) {
            abort(404);
        }

        $service->delete();

        return response()->json([
            'message' => 'Servicio eliminado correctamente'
        ]);
    }
}