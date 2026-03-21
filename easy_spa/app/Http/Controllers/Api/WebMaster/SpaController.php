<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
use App\Models\Spa;
use Illuminate\Http\Request;

class SpaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $spa = Spa::paginate(10);
        return response()->json($spa);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $spa = Spa::create($request->input());
        return response()->json($spa , 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $spa = Spa::findOrFail($id);

        return response()->json($spa);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $spa = Spa::findOrFail($id);

        $spa->update($request->input());

        return response()->json($spa);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $spa = Spa::findOrFail($id);

        $spa->delete();

        return response()->json(null, 204);
    }
}
