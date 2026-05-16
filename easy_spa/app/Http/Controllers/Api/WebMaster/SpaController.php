<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
use App\Http\Requests\SpaRequest;
use App\Models\Spa;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class SpaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $spas = Spa::paginate(10);

        return response()->json($spas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SpaRequest $request)
    {
        $data = $request->validated();

        $data['user_id'] = Auth::id();

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }


        // GUARDAR LOGO
        if ($request->hasFile('logo')) {

            // guardar nuevo logo
            $path = $request->file('logo')->store('spas', 'public');

            // guardar string en BD
            $data['logo'] = $path;
        }

        $spa = Spa::create($data);

        return response()->json($spa, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $spa = Spa::where('slug', $slug)
            ->with([
                'services.category',
                'reservations.client.user',
                'reservations.service',
                'reservations.employee',
                'employees.user',
                'categories'
            ])
            ->firstOrFail();

        $clients = $spa->reservations
            ->filter(fn($r) => $r->client) // evitar nulls
            ->groupBy('client_id')
            ->map(function ($reservations) {
                $client = $reservations->first()->client;

                // coger la última reserva por fecha
                $lastReservation = $reservations
                    ->sortByDesc('reservation_date')
                    ->first();

                return [
                    'id' => $client->id,
                    'name' => $client->name,
                    'user_id' => $client->user_id,
                    'user' => $client->user ? [
                        'id' => $client->user->id,
                        'email' => $client->user->email,
                    ] : null,
                    'surname' => $client->surname,
                    'email' => $client->email,
                    'telephone' => $client->telephone,
                    'last_reservation_date' => $lastReservation->reservation_date,
                ];
            })
            ->values();

        $data = $spa->toArray();
        $data['clients'] = $clients;

        return response()->json([
            'data' => $data,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SpaRequest $request, Spa $spa)
    {
        $data = $request->validated();

        if (empty($data['slug']) && isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        // GUARDAR LOGO
        if ($request->hasFile('logo')) {

            // borrar logo anterior
            if ($spa->logo) {
                Storage::disk('public')->delete($spa->logo);
            }

            // guardar nuevo logo
            $path = $request->file('logo')->store('spas', 'public');

            // guardar string en BD
            $data['logo'] = $path;
        }

        $spa->update($data);

        return response()->json($spa);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Spa $spa)
    {
        DB::transaction(function () use ($spa) {

            $spa->reservations()->delete();

            $spa->services()->delete();

            $spa->employees()->delete();

            $spa->categories()->delete();

            $spa->spaSchedules()->delete();

            $spa->delete();
        });

        return response()->json([
            'message' => 'Spa eliminado correctamente.'
        ]);
    }
}
