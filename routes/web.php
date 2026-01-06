<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::resource('members', \App\Http\Controllers\MemberController::class);
    Route::resource('attendance', \App\Http\Controllers\AttendanceController::class);
    Route::resource('finance', \App\Http\Controllers\TransactionController::class);
    Route::resource('groups', \App\Http\Controllers\GroupController::class);
    Route::post('groups/{group}/enroll', [\App\Http\Controllers\GroupController::class, 'enroll'])->name('groups.enroll');
    Route::delete('groups/{group}/members/{member}', [\App\Http\Controllers\GroupController::class, 'unenroll'])->name('groups.unenroll');
    Route::resource('events', \App\Http\Controllers\EventController::class);
    Route::resource('governance', \App\Http\Controllers\GovernanceController::class);
    Route::resource('announcements', \App\Http\Controllers\AnnouncementController::class);
    Route::get('reports', [\App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');
});

require __DIR__ . '/settings.php';
