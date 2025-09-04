<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $articles = [
            [
                'title' => 'HAZARDOUS WASTE MANAGEMENT',
                'description' => 'Hazardous waste poses a significant challenge when it comes to proper management.',
                'content' => '<div><p>Hazardous waste poses a significant challenge when it comes to proper management. It is crucial to handle it in a way that prevents its detrimental effects on the environment and human health. Based on the guidelines and procedural manual of the DENR DAO92-29 on hazardous waste management and to ensure compliance with the EPR law, we have developed an end to end solution to assist waste generators in our country.</p><p>References: <a href="https://www.env.go.jp/en/recycle/asian_net/Country_Information/Law_N_Regulation/Philippines/DAO%202004-36.pdf">Procedural Manual Title lll DAO 92-29 "Hazardous Waste Management"</a> <a href="https://legacy.senate.gov.ph/republic_acts/ra%2011898.pdf">Republic Act No. 11898 EPR Law</a> <a href="https://www2.deloitte.com/ph/en/pages/risk/articles/epr-law-philippines.html">More info on EPR Law</a></p></div>',
                'img_url' => '/articles/Screenshot_258.png',
                'is_active' => true
            ],
            [
                'title' => 'PHILIPPINE INTERNATIONAL FURNITURE SHOW',
                'description' => 'WASTO & EcohomeArt showcased upcycled products from plastic waste and marine litter at the 2023 Philippine International Furniture Show.',
                'content' => 'WASTO Waste Solutions & EcohomeArt also participated in the Philippine International Furniture Show 2023 from March 9-11 at SMX Convention Center Manila, Mall of Asia Complex in Pasay City to showcase the newly launched upcycled products from plastic waste materials & marine litter.',
                'img_url' => '/articles/Screenshot_259.png',
                'is_active' => true
            ],
            [
                'title' => 'Eco Home Art Polyplastics',
                'description' => 'POLYPLASTICS upcycles plastic waste into stylish, durable, and sustainable furniture, lighting, and accessories.',
                'content' => 'POLYPLASTICS transforms rigid & flexible plastic waste into stylish and sustainable furniture, lighting, and accessories. By upcycling discarded plastics, we create innovative designs that merge durability with eco-conscious craftsmanship, giving waste a second life with purpose and style.',
                'img_url' => '/articles/Screenshot_260.png',
                'is_active' => true
            ]
        ];

        foreach ($articles as $article) {
            \App\Models\Article::create($article);
        }
    }
}
