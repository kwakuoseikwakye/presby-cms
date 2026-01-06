<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GovernanceRecord extends Model
{
    /** @use HasFactory<\Database\Factories\GovernanceRecordFactory> */
    use HasFactory;

    protected $fillable = [
        'member_id',
        'role',
        'start_term',
        'end_term',
        'status',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}
