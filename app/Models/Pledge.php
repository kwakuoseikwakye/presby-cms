<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pledge extends Model
{
    /** @use HasFactory<\Database\Factories\PledgeFactory> */
    use HasFactory;

    protected $fillable = [
        'member_id',
        'amount',
        'description',
        'due_date',
        'status',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}
