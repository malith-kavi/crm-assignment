<?php

namespace Database\Seeders;

use App\Models\LeadSource;
use App\Models\Salesperson;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password123'),
        ]);

        foreach (['Web', 'Referral', 'Email', 'Phone'] as $sourceName) {
            LeadSource::firstOrCreate(['name' => $sourceName]);
        }

        Salesperson::firstOrCreate(['name' => 'Admin']);
    }
}
