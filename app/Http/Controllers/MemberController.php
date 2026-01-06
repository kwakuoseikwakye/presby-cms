<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $members = Member::query()
            ->when(request('search'), function ($query, $search) {
                $query->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('middle_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('members/index', [
            'members' => $members,
            'filters' => request()->all('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('members/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'gender' => 'required|in:Male,Female,Other',
            'dob' => 'nullable|date',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|unique:members,email',
            'occupation' => 'nullable|string|max:255',
            'hometown' => 'nullable|string|max:255',
            'membership_status' => 'required|string',
            'baptism_date' => 'nullable|date',
            'confirmation_date' => 'nullable|date',
        ]);

        Member::create($validated);

        return redirect()->route('members.index')
            ->with('success', 'Member created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Member $member)
    {
        return Inertia::render('members/show', [
            'member' => $member->load(['groups', 'attendance', 'transactions', 'pledges']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Member $member)
    {
        return Inertia::render('members/edit', [
            'member' => $member,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'gender' => 'required|in:Male,Female,Other',
            'dob' => 'nullable|date',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|unique:members,email,' . $member->id,
            'occupation' => 'nullable|string|max:255',
            'hometown' => 'nullable|string|max:255',
            'membership_status' => 'required|string',
            'baptism_date' => 'nullable|date',
            'confirmation_date' => 'nullable|date',
        ]);

        $member->update($validated);

        return redirect()->route('members.index')
            ->with('success', 'Member updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        $member->delete();

        return redirect()->route('members.index')
            ->with('success', 'Member deleted successfully.');
    }
}
