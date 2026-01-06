<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = Group::with('leader')
            ->withCount('members')
            ->paginate(10);

        return Inertia::render('groups/index', [
            'groups' => $groups,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $leaders = User::all(['id', 'name']);

        return Inertia::render('groups/create', [
            'leaders' => $leaders,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:Department,Committee,General Group',
            'leader_id' => 'nullable|exists:users,id',
        ]);

        Group::create($validated);

        return redirect()->route('groups.index')
            ->with('success', 'Group created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Group $group)
    {
        return Inertia::render('groups/show', [
            'group' => $group->load(['leader', 'members']),
            'allMembers' => Member::all(['id', 'first_name', 'last_name']),
        ]);
    }

    /**
     * Enroll a member into a group.
     */
    public function enroll(Request $request, Group $group)
    {
        $validated = $request->validate([
            'member_id' => 'required|exists:members,id',
            'role_in_group' => 'required|string|max:255',
        ]);

        $group->members()->attach($validated['member_id'], [
            'role_in_group' => $validated['role_in_group'],
        ]);

        return back()->with('success', 'Member enrolled successfully.');
    }

    /**
     * Remove a member from a group.
     */
    public function unenroll(Group $group, Member $member)
    {
        $group->members()->detach($member->id);

        return back()->with('success', 'Member removed from group.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Group $group)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Group $group)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group $group)
    {
        //
    }
}
