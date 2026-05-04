<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceCategoryRequest;
use App\Models\ServiceCategory;
use App\Models\Spa;

class ServiceCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Spa $spa)
    {
        $categories = ServiceCategory::where('spa_id', $spa->id)->get();

        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ServiceCategoryRequest $request,  Spa $spa)
    {
        $data = $request->validated();

        $data['spa_id'] = $spa->id;

        $category = ServiceCategory::create($data);

        return response()->json([
            'message' => 'Categoría creada correctamente',
            'data' => $category
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Spa $spa, ServiceCategory $category)
    {
        if ($category->spa_id !== $spa->id) {
            abort(404);
        }

        return response()->json([
            'data' => $category->load([
                'spa',
                'services',
            ])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ServiceCategoryRequest $request, Spa $spa, ServiceCategory $category)
    {
        $category->update($request->validated());

        return response()->json([
            'message' => 'Categoría actualizada correctamente',
            'data' => $category,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Spa $spa, ServiceCategory $category)
    {
        if ($category->spa_id !== $spa->id) {
            return response()->json([
                'message' => 'La categoría no pertenece a este spa.',
            ], 404);
        }

        if ($category->services()->exists()) {
            return response()->json([
                'message' => 'No se puede eliminar la categoría porque tiene servicios asociados.',
            ], 409);
        }

        $category->delete();

        return response()->json([
            'message' => 'Categoría eliminada correctamente',
        ]);
    }
}
