<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Lead;
use App\Models\Note;

class NoteController extends Controller
{
    public function store(Request $request, $leadId)
    {
        request()->validate([
            'content' => 'required|string'
        ]);

        $lead =Lead::find($leadId);

        if(!$lead){
            return response()->json([
                'message' => 'Lead not found'
            ], 404);
        }

        $note = Note::create([
            'lead_id' => $lead->id,
            'user_id' => auth()->id(),
            'content' => $request->content
        ]);

        $note->load('user');
        
        return response()->json([
            'message' => 'Note added successfully',
            'note' => $note,
        ], 201);
    }
}
