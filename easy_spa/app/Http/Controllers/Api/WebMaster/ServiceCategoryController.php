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
    public function show(ServiceCategory $serviceCategory)
    {
        return response()->json($serviceCategory);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ServiceCategoryRequest $request, ServiceCategory $serviceCategory)
    {
        $serviceCategory->update($request->validated());

        return response()->json([
            'message' => 'Categoría actualizada correctamente',
            'data' => $serviceCategory
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServiceCategory $serviceCategory)
    {
        $serviceCategory->delete();

        return response()->json([
            'message' => 'Categoría eliminada correctamente'
        ]);
    }
}
