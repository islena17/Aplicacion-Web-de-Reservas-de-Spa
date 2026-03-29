<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeScheduleRequest;
use App\Models\EmployeeSchedule;
use App\Models\Employee;
use Illuminate\Support\Facades\Auth;

class EmployeeScheduleController extends Controller
{
    private function getAdminSpaId(): int
    {
        return Auth::user()->spa->id;
    }

    public function index()
    {
        $spaId = $this->getAdminSpaId();

        $schedules = EmployeeSchedule::with('employee')
            ->whereHas('employee', function ($query) use ($spaId) {
                $query->where('spa_id', $spaId);
            })
            ->orderBy('day_of_week')
            ->get();

        return response()->json($schedules);
    }

    public function store(EmployeeScheduleRequest $request)
    {
        $spaId = $this->getAdminSpaId();
        $data = $request->validated();

        $employee = Employee::where('spa_id', $spaId)
            ->findOrFail($data['employee_id']);

        $schedule = EmployeeSchedule::create([
            'employee_id' => $employee->id,
            'day_of_week' => $data['day_of_week'],
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time'],
            'is_working' => $data['is_working'],
        ]);

        return response()->json([
            'message' => 'Horario del empleado creado correctamente',
            'data' => $schedule->load('employee'),
        ], 201);
    }

    public function show(EmployeeSchedule $employeeSchedule)
    {
        $spaId = $this->getAdminSpaId();

        if ($employeeSchedule->employee->spa_id !== $spaId) {
            abort(404);
        }

        return response()->json([
            'data' => $employeeSchedule->load('employee'),
        ]);
    }

    public function update(EmployeeScheduleRequest $request, EmployeeSchedule $employeeSchedule)
    {
        $spaId = $this->getAdminSpaId();

        if ($employeeSchedule->employee->spa_id !== $spaId) {
            abort(404);
        }

        $data = $request->validated();

        if (isset($data['employee_id'])) {
            $employee = Employee::where('spa_id', $spaId)
                ->findOrFail($data['employee_id']);

            $data['employee_id'] = $employee->id;
        }

        $employeeSchedule->update($data);

        return response()->json([
            'message' => 'Horario del empleado actualizado correctamente',
            'data' => $employeeSchedule->load('employee'),
        ]);
    }

    public function destroy(EmployeeSchedule $employeeSchedule)
    {
        $spaId = $this->getAdminSpaId();

        if ($employeeSchedule->employee->spa_id !== $spaId) {
            abort(404);
        }

        $employeeSchedule->delete();

        return response()->json([
            'message' => 'Horario del empleado eliminado correctamente',
        ]);
    }
}