<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Transaction;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index()
    {
        // Membership Growth (last 6 months)
        $membershipGrowth = Member::select(DB::raw('count(*) as count, TO_CHAR(created_at, \'YYYY-MM\') as month'))
            ->groupBy('month')
            ->orderBy('month', 'desc')
            ->limit(6)
            ->get();

        // Financial Summary by Category
        $financialSummary = Transaction::select('category', 'type', DB::raw('sum(amount) as total'))
            ->groupBy('category', 'type')
            ->get();

        // Gender Distribution
        $genderDist = Member::select('gender', DB::raw('count(*) as count'))
            ->groupBy('gender')
            ->get();

        return Inertia::render('reports/index', [
            'membershipGrowth' => $membershipGrowth,
            'financialSummary' => $financialSummary,
            'genderDist' => $genderDist,
        ]);
    }
}
