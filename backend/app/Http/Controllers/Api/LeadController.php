<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Lead;

class LeadController extends Controller
{
   
    public function index(Request $request)
    {
        $query = Lead::query();

        if ($request->search){
            $query->where(function($q) use ($request){
                $q->where('lead_name', 'like', '%' .$request->search . '%')
                  ->orWhere('company_name', 'like', '%' .$request->search . '%')
                  ->orWhere('email', 'like', '%' .$request->search . '%');
            });
        }

        if ($request->status){
            $query->where('status', $request->status);
        }

        if ($request->lead_source){
            $query->where('lead_source', $request->lead_source);
        }

        if ($request->assigned_salesperson){
            $query->where('assigned_salesperson', $request->assigned_salesperson);
        }
        $leads = $query->latest()->get();

        return response()->json($leads);
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'lead_name' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'lead_source' => 'required|string',
            'assigned_salesperson' => 'required|string',
            'status' => 'required|string',
            'estimated_deal_value' => 'required|numeric',
        ]);

        $lead = Lead::create($validated);

        return response()->json([
            'message' => 'Lead created successfully',
            'lead' => $lead,
        ],201);
    }
   

    public function show($id)
    {
        $lead = Lead::with('notes.user')->find($id);

        if (!lead) {
            return response()->json([
                'message' => 'Lead not found'
            ], 404);
        }

        return response()->json($lead);
    }

    
    public function update(Request $request, $id)
    {
        $lead = Lead::find($id);

        if (!$lead) {
            return response()->json([
                'message' => 'Lead not found'
            ], 404);
        }

        $validated = $request->validate([
            'lead_name' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'lead_source' => 'required|string',
            'assigned_salesperson' => 'required|string',
            'status' => 'required|string',
            'estimated_deal_value' => 'required|numeric',
        ]);

        $lead->update($validated);

        return response()->json([
            'message' => 'Lead updated successfully',
            'lead' => $lead,
        ]);
    }

    
    public function destroy($id)
    {
        $lead = Lead::find($id);

        if (!$lead) {
            return response()->json([
                'message' => 'Lead not found'
            ], 404);
        }

        $lead->delete();

        return response()->json([
            'message' => 'Lead deleted successfully'
        ]);
    }
}
