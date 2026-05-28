<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
use App\Http\Requests\SpaScheduleRequest;
use App\Models\Spa;
use App\Models\SpaSchedule;
use Illuminate\Http\Request;

class SpaScheduleController extends Controller
{
    public function index(Spa $spa)
    {
        // Lista los horarios del spa seleccionado.
        $schedules = SpaSchedule::with('spa')
            ->where('spa_id', $spa->id)
            ->orderBy('day_of_week')
            ->get();

        return response()->json($schedules);
    }

    public function store(SpaScheduleRequest $request, Spa $spa)
    {
        $data = $request->validated();

        // Asocia automáticamente el horario al spa recibido por la ruta.
        $data['spa_id'] = $spa->id;

        $schedule = SpaSchedule::create($data);

        return response()->json([
            'message' => 'Horario del spa creado correctamente',
            'data' => $schedule->load('spa'),
        ], 201);
    }

    public function bulk(Request $request, Spa $spa)
    {
        // Valida el listado de horarios semanales recibido.
        $data = $request->validate([
            'schedules' => 'required|array',
            'schedules.*.day_of_week' => 'required|integer|min:0|max:6',
            'schedules.*.start_time' => 'required',
            'schedules.*.end_time' => 'required',
            'schedules.*.is_working' => 'required|boolean',
        ]);

        // Crea o actualiza el horario de cada día del spa.
        foreach ($data['schedules'] as $schedule) {
            SpaSchedule::updateOrCreate(
                [
                    'spa_id' => $spa->id,
                    'day_of_week' => $schedule['day_of_week'],
                ],
                [
                    'start_time' => $schedule['start_time'],
                    'end_time' => $schedule['end_time'],
                    'is_working' => $schedule['is_working'],
                ]
            );
        }

        return response()->json([
            'message' => 'Horario del spa guardado correctamente',
        ]);
    }

    public function show(Spa $spa, SpaSchedule $spaSchedule)
    {
        // Evita consultar horarios que no pertenezcan al spa indicado.
        if ($spaSchedule->spa_id !== $spa->id) {
            abort(404);
        }

        return response()->json([
            'data' => $spaSchedule->load('spa'),
        ]);
    }

    public function update(
        SpaScheduleRequest $request,
        Spa $spa,
        SpaSchedule $spaSchedule
    ) {
        // Comprueba que el horario pertenece al spa indicado.
        if ($spaSchedule->spa_id !== $spa->id) {
            abort(404);
        }

        $data = $request->validated();

        // Evita modificar el spa asociado desde la petición.
        unset($data['spa_id']);

        $spaSchedule->update($data);

        return response()->json([
            'message' => 'Horario del spa actualizado correctamente',
            'data' => $spaSchedule->load('spa'),
        ]);
    }

    public function destroy(Spa $spa, SpaSchedule $spaSchedule)
    {
        // Evita eliminar horarios que no pertenezcan al spa indicado.
        if ($spaSchedule->spa_id !== $spa->id) {
            abort(404);
        }

        $spaSchedule->delete();

        return response()->json([
            'message' => 'Horario del spa eliminado correctamente',
        ]);
    }
}