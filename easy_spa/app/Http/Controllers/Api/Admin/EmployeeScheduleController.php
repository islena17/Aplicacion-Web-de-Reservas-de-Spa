<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeScheduleRequest;
use App\Models\EmployeeSchedule;
use App\Models\Employee;
use App\Models\Spa;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class EmployeeScheduleController extends Controller
{
    // Obtiene el spa asociado al administrador autenticado.
    private function getAdminSpaId(): int
    {
        $spa = Spa::where('user_id', Auth::id())->first();

        if (!$spa) {
            abort(404, 'Este admin no tiene un spa asignado.');
        }

        return $spa->id;
    }

    public function index(Request $request)
    {
        $spaId = $this->getAdminSpaId();

        // Lista solo los horarios de empleados pertenecientes al spa del admin.
        $query = EmployeeSchedule::with('employee')
            ->whereHas('employee', function ($query) use ($spaId) {
                $query->where('spa_id', $spaId);
            });

        // Permite filtrar los horarios por empleado.
        if ($request->filled('employee_id')) {
            $query->where('employee_id', $request->employee_id);
        }

        $schedules = $query
            ->orderBy('date')
            ->get();

        return response()->json([
            'data' => $schedules
        ]);
    }

    public function store(EmployeeScheduleRequest $request)
    {
        $spaId = $this->getAdminSpaId();

        $data = $request->validated();

        // Comprueba que el empleado pertenece al spa del admin.
        $employee = Employee::where('spa_id', $spaId)
            ->findOrFail($data['employee_id']);

        // Crea un nuevo horario para el empleado indicado.
        $schedule = EmployeeSchedule::create([
            'employee_id' => $employee->id,
            'date' => $data['date'],
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time'],
            'is_working' => $data['is_working'] ?? true,
        ]);

        return response()->json([
            'message' => 'Horario del empleado creado correctamente',
            'data' => $schedule->load('employee'),
        ], 201);
    }

    public function show(EmployeeSchedule $employeeSchedule)
    {
        $spaId = $this->getAdminSpaId();

        // Evita que un admin consulte horarios de empleados de otro spa.
        if ($employeeSchedule->employee->spa_id !== $spaId) {
            abort(404);
        }

        return response()->json([
            'data' => $employeeSchedule->load('employee'),
        ]);
    }

    public function bulk(Request $request)
    {
        $spaId = $this->getAdminSpaId();

        // Valida el empleado y el listado de horarios recibido.
        $data = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'schedules' => 'required|array',
        ]);

        // Comprueba que el empleado pertenece al spa del admin.
        $employee = Employee::where('spa_id', $spaId)
            ->findOrFail($data['employee_id']);

        // Crea o actualiza el horario de cada día.
        foreach ($data['schedules'] as $schedule) {
            EmployeeSchedule::updateOrCreate(
                [
                    'employee_id' => $employee->id,
                    'date' => $schedule['date'],
                ],
                [
                    'day_of_week' => $schedule['day_of_week'],
                    'start_time' => $schedule['start_time'],
                    'end_time' => $schedule['end_time'],
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
        $spaId = $this->getAdminSpaId();

        // Verifica que el horario pertenece a un empleado del spa del admin.
        if ($employeeSchedule->employee->spa_id !== $spaId) {
            abort(404);
        }

        $data = $request->validated();

        // Si se cambia el empleado, se comprueba que también pertenece al mismo spa.
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

        // Evita eliminar horarios de empleados que no pertenezcan al spa del admin.
        if ($employeeSchedule->employee->spa_id !== $spaId) {
            abort(404);
        }

        $employeeSchedule->delete();

        return response()->json([
            'message' => 'Horario del empleado eliminado correctamente',
        ]);
    }
}