<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeBlockRequest;
use App\Models\Employee;
use App\Models\EmployeeBlock;
use App\Models\Spa;
use Illuminate\Support\Facades\Auth;

class EmployeeBlockController extends Controller
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

        $blocks = EmployeeBlock::with('employee')
            ->whereHas('employee', function ($query) use ($spaId) {
                $query->where('spa_id', $spaId);
            })
            ->latest()
            ->paginate(10);

        return response()->json($blocks);
    }

    public function store(EmployeeBlockRequest $request)
    {
        $spaId = $this->getAdminSpaId();
        $data = $request->validated();

        $employee = Employee::where('spa_id', $spaId)
            ->findOrFail($data['employee_id']);

        $block = EmployeeBlock::create([
            'employee_id'   => $employee->id,
            'date'          => $data['date'],
            'start_time'    => $data['start_time'],
            'end_time'      => $data['end_time'],
            'reason'        => $data['reason'] ?? null,
            'is_available'  => $data['is_available'] ?? false,
        ]);

        return response()->json([
            'message' => 'Bloqueo creado correctamente',
            'data' => $block->load('employee'),
        ], 201);
    }

    public function show(EmployeeBlock $employeeBlock)
    {
        $spaId = $this->getAdminSpaId();

        if ($employeeBlock->employee->spa_id !== $spaId) {
            abort(404);
        }

        return response()->json([
            'data' => $employeeBlock->load('employee'),
        ]);
    }

    public function update(EmployeeBlockRequest $request, EmployeeBlock $employeeBlock)
    {
        $spaId = $this->getAdminSpaId();

        if ($employeeBlock->employee->spa_id !== $spaId) {
            abort(404);
        }

        $data = $request->validated();

        if (isset($data['employee_id'])) {
            $employee = Employee::where('spa_id', $spaId)
                ->findOrFail($data['employee_id']);

            $data['employee_id'] = $employee->id;
        }

        $employeeBlock->update($data);

        return response()->json([
            'message' => 'Bloqueo actualizado correctamente',
            'data' => $employeeBlock->load('employee'),
        ]);
    }

    public function destroy(EmployeeBlock $employeeBlock)
    {
        $spaId = $this->getAdminSpaId();

        if ($employeeBlock->employee->spa_id !== $spaId) {
            abort(404);
        }

        $employeeBlock->delete();

        return response()->json([
            'message' => 'Bloqueo eliminado correctamente',
        ]);
    }
}
