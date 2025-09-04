<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder {
    public function run() {
        $products = json_decode(file_get_contents(base_path('constants.products.json')), true);
        $publicPath = public_path('products');
        if (!is_dir($publicPath)) {
            mkdir($publicPath, 0777, true);
        }

        // Get all categories with their IDs
        $categories = Category::pluck('id', 'name')->toArray();

        foreach ($products as $product) {
            $categoryName = $product['categories'];
            unset($product['categories']); // Remove the categories field
            
            // Add the category_id
            if (isset($categories[$categoryName])) {
                $product['category_id'] = $categories[$categoryName];
            }

            Product::create($product);
        }
    }
}
