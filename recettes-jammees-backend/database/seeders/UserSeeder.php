<?php

namespace Database\Seeders;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Vincent Houle',
                'email' => 'addressemail@gmail.com',
                'password' => Hash::make('123456'),
            ],
            [
                'name' => 'Autre Personne',
                'email' => 'autremail@gmail.com',
                'password' => Hash::make('123456')
            ]
        ]);
    }
}
