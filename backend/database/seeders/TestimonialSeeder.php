<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class TestimonialSeeder extends Seeder
{
    public function run()
    {
       $testimonials = [
    [
        'name' => 'Maria Santos',
        'position' => 'CEO, GreenTech Solutions',
        'content' => 'Working with EcohomeArt has been a game-changer for us. Their eco-friendly products align perfectly with our sustainability goals.',
        'img_url' => '/testimonials/22.jpg',
        'is_active' => true,
        'display_order' => 1
    ],
    [
        'name' => 'James Lee',
        'position' => 'Operations Manager, CleanCity Corp.',
        'content' => 'The waste management solutions provided are efficient and practical. We’ve seen a significant improvement in our operations.',
        'img_url' => '/testimonials/32.jpg',
        'is_active' => true,
        'display_order' => 2
    ],
    [
        'name' => 'Sophia Reyes',
        'position' => 'Environmental Advocate',
        'content' => 'I admire the commitment to sustainability. Their products not only look great but also help reduce waste in our communities.',
        'img_url' => '/testimonials/44.jpg',
        'is_active' => true,
        'display_order' => 3
    ],
    [
        'name' => 'David Cruz',
        'position' => 'Founder, RecycleNow PH',
        'content' => 'Partnering with EcohomeArt allowed us to scale our recycling initiatives while creating products that people actually love to use.',
        'img_url' => '/testimonials/45.jpg',
        'is_active' => true,
        'display_order' => 4
    ],
];



        foreach ($testimonials as $testimonial) {
            
            Testimonial::create($testimonial);
        }
    }
}
