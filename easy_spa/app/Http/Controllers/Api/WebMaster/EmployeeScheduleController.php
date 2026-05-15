<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeScheduleRequest;
use App\Models\EmployeeSchedule;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeScheduleController extends Controller
{
    public function index(Request $request)
    {
        $query = EmployeeSchedule::with([
            'employee',
            'employee.spa',
            'employee.user',
        ]);

        if ($request->filled('employee_id')) {
            $query->where('employee_id', $request->employee_id);
        }

        if ($request->filled('spa_id')) {
            $query->whereHas('employee', function ($q) use ($request) {
                $q->where('spa_id', $request->spa_id);
            });
        }

        $schedules = $query
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        return response()->json([
            'data' => $schedules,
        ]);
    }

    public function store(EmployeeScheduleRequest $request)
    {
        $data = $request->validated();

        $employee = Employee::findOrFail($data['employee_id']);

        $schedule = EmployeeSchedule::create([
            'employee_id' => $employee->id,
            'date' => $data['date'],
            'day_of_week' => $data['day_of_week'] ?? null,
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time'],
            'is_working' => $data['is_working'] ?? true,
        ]);

        return response()->json([
            'message' => 'Horario del empleado creado correctamente',
            'data' => $schedule->load(['employee', 'employee.spa', 'employee.user']),
        ], 201);
    }

    public function show(EmployeeSchedule $employeeSchedule)
    {
        return response()->json([
            'data' => $employeeSchedule->load([
                'employee',
                'employee.spa',
                'employee.user',
            ]),
        ]);
    }

    public function bulk(Request $request)
    {
        $data = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'schedules' => 'required|array',
            'schedules.*.date' => 'required|date',
            'schedules.*.day_of_week' => 'nullable|string',
            'schedules.*.start_time' => 'nullable|date_format:H:i',
            'schedules.*.end_time' => 'nullable|date_format:H:i',
            'schedules.*.is_working' => 'required|boolean',
        ]);

        $employee = Employee::findOrFail($data['employee_id']);

        foreach ($data['schedules'] as $schedule) {
            EmployeeSchedule::updateOrCreate(
                [
                    'employee_id' => $employee->id,
                    'date' => $schedule['date'],
                ],
                [
                    'day_of_week' => $schedule['day_of_week'] ?? null,
                    'start_time' => $schedule['start_time'] ?? null,
                    'end_time' => $schedule['end_time'] ?? null,
                    'is_working' => $schedule['is_working'],
                ]
            );
        }

        return response()->json([
            'message' => 'Horario guardado correctamente',
        ]);
    }

    public function update(EmployeeScheduleRequest $request, EmployeeSchedule $employeeSchedule)
    {
        $data = $request->validated();

        if (isset($data['employee_id'])) {
            $employee = Employee::findOrFail($data['employee_id']);
            $data['employee_id'] = $employee->id;
        }

        $employeeSchedule->update($data);

        return response()->json([
            'message' => 'Horario del empleado actualizado correctamente',
            'data' => $employeeSchedule->load([
                'employee',
                'employee.spa',
                'employee.user',
            ]),
        ]);
    }

    public function destroy(EmployeeSchedule $employeeSchedule)
    {
        $employeeSchedule->delete();

        return response()->json([
            'message' => 'Horario del empleado eliminado correctamente',
        ]);
    }
}