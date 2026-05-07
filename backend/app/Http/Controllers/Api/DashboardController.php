<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Lead;
use App\Models\Note;

class DashboardController extends Controller
{
    public function stats()
    {
        $totalLeads = Lead::where('is_deleted', false)->count();
        $newLeads = Lead::where('status', 'New')->where('is_deleted', false)->count();
        $qualifiedLeads = Lead::where('status', 'Qualified')->where('is_deleted', false)->count();
        $wonLeads = Lead::where('status', 'Won')->where('is_deleted', false)->count();
        $lostLeads = Lead::where('status', 'Lost')->where('is_deleted', false)->count();
        $totalDealValue = Lead::where('is_deleted', false)->sum('estimated_deal_value');
        $wonDealValue = Lead::where('status', 'Won')->where('is_deleted', false)->sum('estimated_deal_value');

        return response()->json([
            'total_leads' => $totalLeads,
            'new_leads' => $newLeads,
            'qualified_leads' => $qualifiedLeads,
            'won_leads' => $wonLeads,
            'lost_leads' => $lostLeads,
            'total_deal_value' => $totalDealValue,
            'won_deal_value' => $wonDealValue,
        ]);
    }
}
