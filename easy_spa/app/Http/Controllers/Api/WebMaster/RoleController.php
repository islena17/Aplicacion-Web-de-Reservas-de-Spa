<?php

namespace App\Http\Controllers\Api\WebMaster;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
     public function index()
    {
        return response()->json([
            'data' => Role::all()
        ]);
    }
}
