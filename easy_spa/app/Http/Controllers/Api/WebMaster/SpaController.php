<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
use App\Http\Requests\SpaRequest;
use App\Models\Spa;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

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
                'reservations.client',
                'reservations.service',
                'reservations.employee',
            ])
            ->firstOrFail();

        return response()->json($spa);
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

        $spa->update($data);

        return response()->json($spa);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Spa $spa)
    {
        $spa->delete();

        return response()->json(null, 204);
    }
}
