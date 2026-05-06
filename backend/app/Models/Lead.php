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
        'estimated_deal_value'
    ];
    
    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
