<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Member;

class Transaction extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;

    protected $fillable = [
        'member_id',
        'amount',
        'type',
        'category',
        'payment_method',
        'description',
        'transaction_date',
    ];

    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}
