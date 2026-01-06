<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Member;
use App\Models\User;

class Group extends Model
{
    /** @use HasFactory<\Database\Factories\GroupFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'type',
        'leader_id',
    ];

    public function members()
    {
        return $this->belongsToMany(Member::class, 'group_member')
            ->withPivot('role_in_group')
            ->withTimestamps();
    }

    public function leader()
    {
        return $this->belongsTo(User::class, 'leader_id');
    }
}
