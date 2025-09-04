<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            "SEATINGS",
            "OCCASSIONAL CHAIRS",
            "BAR & SERVING ACCENTS",
            "OFFICE ACCENTS",
            "CASEWOOD",
            "STORAGE BINS",
            "PLANTERS",
            "MATS",
            "BAGS",
        ];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}
