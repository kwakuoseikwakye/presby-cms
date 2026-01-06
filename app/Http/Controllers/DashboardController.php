<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Event;
use App\Models\Member;
use App\Models\Transaction;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $startOfMonth = Carbon::now()->startOfMonth();

        $totalMembers = Member::count();
        $activeMembers = Member::where('membership_status', 'Active')->count();

        $monthlyIncome = Transaction::where('type', 'Income')
            ->where('transaction_date', '>=', $startOfMonth)
            ->sum('amount');

        $monthlyExpense = Transaction::where('type', 'Expense')
            ->where('transaction_date', '>=', $startOfMonth)
            ->sum('amount');

        $upcomingEvents = Event::where('start_date', '>=', Carbon::now())
            ->orderBy('start_date', 'asc')
            ->limit(5)
            ->get();

        $recentAnnouncements = Announcement::where('status', 'Published')
            ->orderBy('published_at', 'desc')
            ->limit(5)
            ->get();

        $recentTransactions = Transaction::with('member')
            ->orderBy('transaction_date', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'total_members' => $totalMembers,
                'active_members' => $activeMembers,
                'monthly_income' => $monthlyIncome,
                'monthly_expense' => $monthlyExpense,
                'savings' => $monthlyIncome - $monthlyExpense,
            ],
            'upcomingEvents' => $upcomingEvents,
            'recentAnnouncements' => $recentAnnouncements,
            'recentTransactions' => $recentTransactions,
        ]);
    }
}
