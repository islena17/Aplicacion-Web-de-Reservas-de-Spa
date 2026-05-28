<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceRequest;
use App\Models\Service;
use App\Models\Spa;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    /**
     * Obtener el spa del admin autenticado
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

        $services = Service::with(['category'])
            ->where('spa_id', $spaId)
            ->orderBy('name')
            ->get();

        return response()->json([
            'data' => $services
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */

    public function store(ServiceRequest $request)
    {
        $spaId = $this->getAdminSpaId();

        $data = $request->validated();

        // 1. Verificar si viene imagen en la petición
        if ($request->hasFile('image')) {
      //2. Guardar el nuevo archivo en la carpeta 'services' dentro del disco 'public'
            $path = $request->file('image')->store('services', 'public');

            $data['image'] = $path;
        }

        $service = Service::create([
            ...$data,
            'spa_id' => $spaId,
        ]);

        return response()->json([
            'message' => 'Servicio creado correctamente',
            'data' => $service->load(['category'])
        ], 201);
    } /*
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        $spaId = $this->getAdminSpaId();

        if ($service->spa_id !== $spaId) {
            abort(404);
        }

        return response()->json([
            'data' => $service->load(['category'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(ServiceRequest $request, Service $service)
    {
        $spaId = $this->getAdminSpaId();

        if ($service->spa_id !== $spaId) {
            abort(404);
        }

        $data = $request->validated();
        unset($data['spa_id']);

        // 1. Verificar si viene una nueva imagen en la petición
        if ($request->hasFile('image')) {

            // 2.  Borrar la imagen anterior del disco para no llenar el servidor de basura
            if ($service->image) {
                Storage::disk('public')->delete($service->image);
            }

            // 3. Guardar el nuevo archivo en la carpeta 'services' dentro del disco 'public'

            $path = $request->file('image')->store('services', 'public');

            // 4. Reemplazar el objeto de la imagen por la ruta de texto para la BD
            $data['image'] = $path;
        } else {
            // para que no sobrescriba la ruta vieja con NULL en la base de datos.
            unset($data['image']);
        }

        $service->update($data);

        return response()->json([
            'message' => 'Servicio actualizado correctamente',
            'data' => $service->load(['category'])
        ]);
    }
}
