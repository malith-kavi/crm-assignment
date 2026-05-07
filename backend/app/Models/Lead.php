<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'lead_name',
        'company_name',
        'email',
        'phone',
        'lead_source',
        'assigned_salesperson',
        'status',
        'estimated_deal_value',
        'is_deleted'
    ];
    
    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
