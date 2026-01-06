<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = Transaction::with('member')
            ->when(request('type'), fn($q, $type) => $q->where('type', $type))
            ->when(request('category'), fn($q, $cat) => $q->where('category', $cat))
            ->orderBy('transaction_date', 'desc')
            ->paginate(15)
            ->withQueryString();

        $totalIncome = Transaction::where('type', 'Income')->sum('amount');
        $totalExpense = Transaction::where('type', 'Expense')->sum('amount');

        return Inertia::render('finance/index', [
            'transactions' => $transactions,
            'summary' => [
                'total_income' => $totalIncome,
                'total_expense' => $totalExpense,
                'balance' => $totalIncome - $totalExpense,
            ],
            'filters' => request()->all('type', 'category'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $members = Member::all(['id', 'first_name', 'last_name']);

        return Inertia::render('finance/create', [
            'members' => $members,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'member_id' => 'nullable|exists:members,id',
            'amount' => 'required|numeric|min:0',
            'type' => 'required|in:Income,Expense',
            'category' => 'required|string|max:255',
            'payment_method' => 'required|in:Cash,Mobile Money,Bank Transfer,Other',
            'description' => 'nullable|string',
            'transaction_date' => 'required|date',
        ]);

        Transaction::create($validated);

        return redirect()->route('finance.index')
            ->with('success', 'Transaction recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
