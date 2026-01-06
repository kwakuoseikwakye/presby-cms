<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    /** @use HasFactory<\Database\Factories\MemberFactory> */
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'middle_name',
        'gender',
        'dob',
        'phone',
        'email',
        'occupation',
        'hometown',
        'membership_status',
        'baptism_date',
        'confirmation_date',
        'photo_url',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class, 'group_member')
            ->withPivot('role_in_group')
            ->withTimestamps();
    }

    public function attendance()
    {
        return $this->hasMany(Attendance::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function pledges()
    {
        return $this->hasMany(Pledge::class);
    }

    public function getFullNameAttribute()
    {
        return "{$this->first_name} " . ($this->middle_name ? "{$this->middle_name} " : "") . "{$this->last_name}";
    }
}
