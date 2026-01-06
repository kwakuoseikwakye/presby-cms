<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->enum('gender', ['Male', 'Female', 'Other']);
            $table->date('dob')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable()->unique();
            $table->string('occupation')->nullable();
            $table->string('hometown')->nullable();
            $table->string('membership_status')->default('Active'); // Active, Inactive, Deceased, Transferred
            $table->date('baptism_date')->nullable();
            $table->date('confirmation_date')->nullable();
            $table->string('photo_url')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
