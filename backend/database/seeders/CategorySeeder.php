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
            "DINING TABLE",
            "FLOOR LAMPS",
            "TABLE LAMPS",
            "SUSPENSION LAMPS",
            "WALL LAMP",
            "CASE GOODS",
            "CHAISE LOUNGE",
            "BED",
            "MIRRORS",
            "MATS",
            "BAGS",
            "ACCESSORIES",
            "HAMPERS",
            "STORAGE BINS",
            "PLANTERS",
            "OFFICE ACCENTS",
            "BAR & SERVING ACCENTS",
            "CASEWOOD",
        ];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}
