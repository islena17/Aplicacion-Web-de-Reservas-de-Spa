<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SpaScheduleRequest;
use App\Models\Spa;
use App\Models\SpaSchedule;
use Illuminate\Support\Facades\Auth;

class SpaScheduleController extends Controller
{
       private function getAdminSpaId(): int
    {
        $spa = Spa::where('user_id', Auth::id())->first();

        if (!$spa) {
            abort(404, 'Este admin no tiene un spa asignado.');
        }

        return $spa->id;
    }
    public function index()
    {
        $spaId = $this->getAdminSpaId();

        $schedules = SpaSchedule::with('spa')
            ->where('spa_id', $spaId)
            ->orderBy('day_of_week')
            ->get();

        return response()->json($schedules);
    }

    public function store(SpaScheduleRequest $request)
    {
        $spaId = $this->getAdminSpaId();

        $data = $request->validated();
        $data['spa_id'] = $spaId;

        $schedule = SpaSchedule::create($data);

        return response()->json([
            'message' => 'Horario del spa creado correctamente',
            'data' => $schedule->load('spa'),
        ], 201);
    }

    public function show(SpaSchedule $spaSchedule)
    {
        $spaId = $this->getAdminSpaId();

        if ($spaSchedule->spa_id !== $spaId) {
            abort(404);
        }

        return response()->json([
            'data' => $spaSchedule->load('spa'),
        ]);
    }

    public function update(SpaScheduleRequest $request, SpaSchedule $spaSchedule)
    {
        $spaId = $this->getAdminSpaId();

        if ($spaSchedule->spa_id !== $spaId) {
            abort(404);
        }

        $data = $request->validated();
        unset($data['spa_id']);

        $spaSchedule->update($data);

        return response()->json([
            'message' => 'Horario del spa actualizado correctamente',
            'data' => $spaSchedule->load('spa'),
        ]);
    }

    public function destroy(SpaSchedule $spaSchedule)
    {
        $spaId = $this->getAdminSpaId();

        if ($spaSchedule->spa_id !== $spaId) {
            abort(404);
        }

        $spaSchedule->delete();

        return response()->json([
            'message' => 'Horario del spa eliminado correctamente',
        ]);
    }
}