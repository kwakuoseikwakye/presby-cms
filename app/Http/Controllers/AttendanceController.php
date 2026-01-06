<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $attendance = Attendance::with('member')
            ->orderBy('event_date', 'desc')
            ->paginate(15);

        return Inertia::render('attendance/index', [
            'attendance' => $attendance,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $members = Member::where('membership_status', 'Active')->get();

        return Inertia::render('attendance/create', [
            'members' => $members,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'event_name' => 'required|string|max:255',
            'event_date' => 'required|date',
            'attendance' => 'required|array',
            'attendance.*.member_id' => 'required|exists:members,id',
            'attendance.*.status' => 'required|in:Present,Absent,Excused',
            'attendance.*.remarks' => 'nullable|string',
        ]);

        foreach ($validated['attendance'] as $record) {
            Attendance::create([
                'member_id' => $record['member_id'],
                'event_name' => $validated['event_name'],
                'event_date' => $validated['event_date'],
                'status' => $record['status'],
                'remarks' => $record['remarks'] ?? null,
            ]);
        }

        return redirect()->route('attendance.index')
            ->with('success', 'Attendance marked successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attendance $attendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        //
    }
}
