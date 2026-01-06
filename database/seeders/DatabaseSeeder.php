<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Super Admin
        \App\Models\User::factory()->withoutTwoFactor()->create([
            'name' => 'Super Admin',
            'email' => 'admin@presbycms.com',
            'password' => bcrypt('password'),
            'role' => 'Super Admin',
        ]);

        // Create other test roles if needed
        $roles = [
            'Church Admin',
            'Minister',
            'Elder',
            'Deacon',
            'Treasurer',
            'Secretary',
            'Department Head',
            'Member',
        ];

        foreach ($roles as $role) {
            \App\Models\User::factory()->withoutTwoFactor()->create([
                'name' => "Sample {$role}",
                'email' => strtolower(str_replace(' ', '.', $role)) . '@presbycms.com',
                'role' => $role,
            ]);
        }
    }
}
