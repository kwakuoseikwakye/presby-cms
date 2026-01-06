<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    /** @use HasFactory<\Database\Factories\AttendanceFactory> */
    use HasFactory;

    protected $table = 'attendance';

    protected $fillable = [
        'member_id',
        'event_name',
        'event_date',
        'status',
        'remarks',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}
