<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Employee;
use App\Models\Spa;

class EmployeeController extends Controller
{

    /**
     * Obtener el id del spa del admin autenticado.
     */

    private function getAdminSpaId(): int
    {
        $spa = Spa::where('user_id', Auth::id())->first();

        if (!$spa) {
            abort(404, 'Este admin no tiene un spa asignado.');
        }

        return $spa->id;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $spaId = $this->getAdminSpaId();

        $employees = Employee::with(['spa', 'user'])
            ->where('spa_id', $spaId)
            ->latest()
            ->paginate(10);

        return response()->json($employees);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeRequest $request)
    {
        $spaId = $this->getAdminSpaId();

        $employee = Employee::create([
            ...$request->validated(),
            'spa_id' => $spaId,
        ]);

        return response()->json([
            'message' => 'Empleado creado correctamente',
            'data' => $employee->load(['spa', 'user']),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        $spaId = $this->getAdminSpaId();

        if ($employee->spa_id !== $spaId) {
            abort(404);
        }

        return response()->json([
            'data' => $employee->load(['spa', 'user']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EmployeeRequest $request, Employee $employee)
    {
        $spaId = $this->getAdminSpaId();

        if ($employee->spa_id !== $spaId) {
            abort(404);
        }

        $data = $request->validated();
        unset($data['spa_id']);

        $employee->update($data);

        return response()->json([
            'message' => 'Empleado actualizado correctamente',
            'data' => $employee->load(['spa', 'user']),
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $spaId = $this->getAdminSpaId();

        if ($employee->spa_id !== $spaId) {
            abort(404);
        }

        $employee->delete();

        return response()->json([
            'message' => 'Empleado eliminado correctamente',
        ]);
    }
}
