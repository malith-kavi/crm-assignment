<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Salesperson;
use Illuminate\Http\Request;

class SalespersonController extends Controller
{
    public function index()
    {
        return response()->json(
            Salesperson::query()->orderBy('name')->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:salespersons,name',
        ]);

        $salesperson = Salesperson::create($validated);

        return response()->json([
            'message' => 'Salesperson created successfully',
            'salesperson' => $salesperson,
        ], 201);
    }
}