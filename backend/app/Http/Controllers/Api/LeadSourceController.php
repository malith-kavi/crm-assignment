<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LeadSource;
use Illuminate\Http\Request;

class LeadSourceController extends Controller
{
    public function index()
    {
        return response()->json(
            LeadSource::query()->orderBy('name')->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:lead_sources,name',
        ]);

        $leadSource = LeadSource::create($validated);

        return response()->json([
            'message' => 'Lead source created successfully',
            'lead_source' => $leadSource,
        ], 201);
    }
}