<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceCategoryRequest;
use App\Models\ServiceCategory;
use Illuminate\Support\Facades\Auth;

class ServiceCategoryController extends Controller
{
    private function getAdminSpaId(): int
    {
        return Auth::user()->spa->id;
    }

    /**
     * Listar categorías del spa del admin
     */
    public function index()
    {
        $spaId = $this->getAdminSpaId();

        $categories = ServiceCategory::where('spa_id', $spaId)
            ->orderBy('order')
            ->get();

        return response()->json($categories);
    }

    /**
     * Crear nueva categoría
     */
    public function store(ServiceCategoryRequest $request)
    {
        $spaId = $this->getAdminSpaId();

        $data = $request->validated();
        $data['spa_id'] = $spaId;

        $category = ServiceCategory::create($data);

        return response()->json([
            'message' => 'Categoría creada correctamente',
            'data' => $category
        ], 201);
    }

    /**
     * Mostrar categoría
     */
    public function show(ServiceCategory $serviceCategory)
    {
        $spaId = $this->getAdminSpaId();

        if ($serviceCategory->spa_id !== $spaId) {
            abort(404);
        }

        return response()->json([
            'data' => $serviceCategory
        ]);
    }

    /**
     * Actualizar categoría
     */
    public function update(ServiceCategoryRequest $request, ServiceCategory $serviceCategory)
    {
        $spaId = $this->getAdminSpaId();

        if ($serviceCategory->spa_id !== $spaId) {
            abort(404);
        }

        $data = $request->validated();
        unset($data['spa_id']); // seguridad

        $serviceCategory->update($data);

        return response()->json([
            'message' => 'Categoría actualizada correctamente',
            'data' => $serviceCategory
        ]);
    }

    /**
     * Eliminar categoría
     */
    public function destroy(ServiceCategory $serviceCategory)
    {
        $spaId = $this->getAdminSpaId();

        if ($serviceCategory->spa_id !== $spaId) {
            abort(404);
        }

        $serviceCategory->delete();

        return response()->json([
            'message' => 'Categoría eliminada correctamente'
        ]);
    }
}