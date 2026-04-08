<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Demo accounts for local development. Password for all: admin123
     */
    public function run(): void
    {
        $hashed = Hash::make('admin123');

        $accounts = [
            [
                'username' => 'admin',
                'email' => 'admin@bluinq.test',
                'fullname' => 'Bluinq Admin',
                'name' => 'Bluinq Admin',
                'role' => 'admin',
            ],
            [
                'username' => 'analyst',
                'email' => 'analyst@bluinq.test',
                'fullname' => 'Finance Analyst',
                'name' => 'Finance Analyst',
                'role' => 'analyst',
            ],
            [
                'username' => 'billing',
                'email' => 'billing@bluinq.test',
                'fullname' => 'Billing Specialist',
                'name' => 'Billing Specialist',
                'role' => 'billing',
            ],
        ];

        foreach ($accounts as $row) {
            User::updateOrCreate(
                ['email' => $row['email']],
                array_merge($row, [
                    'password' => $hashed,
                    'image' => null,
                    'email_verified_at' => now(),
                ])
            );
        }

        if ($this->command) {
            $this->command->info('UserSeeder: 3 accounts (password: admin123) — admin@bluinq.test, analyst@bluinq.test, billing@bluinq.test');
        }
    }
}
