<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeScheduleRequest;
use App\Models\EmployeeSchedule;

class EmployeeScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $schedules = EmployeeSchedule::with('employee')
            ->orderBy('day_of_week')
            ->get();

        return response()->json($schedules);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeScheduleRequest $request)
    {
        $schedule = EmployeeSchedule::create($request->validated());

        return response()->json([
            'message' => 'Horario creado correctamente',
            'data' => $schedule->load('employee')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(EmployeeSchedule $employeeSchedule)
    {
        return response()->json([
            'data' => $employeeSchedule->load('employee')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EmployeeScheduleRequest $request, EmployeeSchedule $employeeSchedule)
    {
        $employeeSchedule->update($request->validated());

        return response()->json([
            'message' => 'Horario actualizado correctamente',
            'data' => $employeeSchedule->load('employee')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmployeeSchedule $employeeSchedule)
    {
        $employeeSchedule->delete();

        return response()->json([
            'message' => 'Horario eliminado correctamente'
        ]);
    }
}