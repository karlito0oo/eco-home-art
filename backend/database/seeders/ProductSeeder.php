<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder {
    public function run() {
        $products = json_decode(file_get_contents(base_path('constants.products.json')), true);
        $publicPath = public_path('products');
        if (!is_dir($publicPath)) {
            mkdir($publicPath, 0777, true);
        }
        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
