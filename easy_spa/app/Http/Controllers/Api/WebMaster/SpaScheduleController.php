<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
use App\Http\Requests\SpaScheduleRequest;
use App\Models\SpaSchedule;

class SpaScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $schedules = SpaSchedule::with('spa')
            ->orderBy('day_of_week')
            ->get();

        return response()->json($schedules);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SpaScheduleRequest $request)
    {
        $schedule = SpaSchedule::create($request->validated());

        return response()->json([
            'message' => 'Horario del spa creado correctamente',
            'data' => $schedule->load('spa')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(SpaSchedule $spaSchedule)
    {
        return response()->json([
            'data' => $spaSchedule->load('spa')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SpaScheduleRequest $request, SpaSchedule $spaSchedule)
    {
        $spaSchedule->update($request->validated());

        return response()->json([
            'message' => 'Horario del spa actualizado correctamente',
            'data' => $spaSchedule->load('spa')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SpaSchedule $spaSchedule)
    {
        $spaSchedule->delete();

        return response()->json([
            'message' => 'Horario del spa eliminado correctamente'
        ]);
    }
}