<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeBlockRequest;
use App\Models\EmployeeBlock;

class EmployeeBlockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blocks = EmployeeBlock::with('employee')
            ->latest()
            ->paginate(10);

        return response()->json($blocks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeBlockRequest $request)
    {
        $block = EmployeeBlock::create($request->validated());

        return response()->json([
            'message' => 'Bloqueo creado correctamente',
            'data' => $block->load('employee'),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(EmployeeBlock $employeeBlock)
    {
        return response()->json([
            'data' => $employeeBlock->load('employee'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EmployeeBlockRequest $request, EmployeeBlock $employeeBlock)
    {
        $employeeBlock->update($request->validated());

        return response()->json([
            'message' => 'Bloqueo actualizado correctamente',
            'data' => $employeeBlock->load('employee'),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmployeeBlock $employeeBlock)
    {
        $employeeBlock->delete();

        return response()->json([
            'message' => 'Bloqueo eliminado correctamente',
        ]);
    }
}