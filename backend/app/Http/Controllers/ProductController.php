<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    private function ensureFeaturedOrder()
    {
        $featuredProducts = Product::where('is_featured', true)
            ->whereNull('featured_order')
            ->get();

        $lastOrder = Product::where('is_featured', true)
            ->whereNotNull('featured_order')
            ->max('featured_order') ?? 0;

        foreach ($featuredProducts as $index => $product) {
            $product->update(['featured_order' => $lastOrder + $index + 1]);
        }
    }

    public function reorderFeatured(Request $request)
    {
        try {
            $validated = $request->validate([
                'products' => 'required|array',
                'products.*.id' => 'required|exists:products,id',
                'products.*.featured_order' => 'required|integer'
            ]);

            \DB::transaction(function () use ($validated) {
                // First, update all featured products to ensure proper ordering
                Product::where('is_featured', true)
                    ->update(['featured_order' => null]);

                // Then update with new orders
                foreach ($validated['products'] as $item) {
                    Product::where('id', $item['id'])->update([
                        'featured_order' => $item['featured_order'],
                        'is_featured' => true
                    ]);
                }
            });

            return response()->json(['message' => 'Products reordered successfully']);
        } catch (\Exception $e) {
            Log::error("Error reordering products: " . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function index(Request $request)
    {
        $perPage = $request->get("per_page", 10);
        $search = $request->get("search", "");
        $exclude = $request->get("exclude") ? explode(",", $request->get("exclude")) : [];

        $query = Product::query()->with(["category", "images"]);

        // Handle featured products
        if ($request->has("featured")) {
            $query->where("is_featured", true)
                  ->orderBy("featured_order", "asc");
            // Make sure all featured products have an order
            $this->ensureFeaturedOrder();
        }

        // Handle category filter
        if ($request->has("category_id") && !empty($request->category_id)) {
            $query->where("category_id", $request->category_id);
        }

        // Handle search
        // Handle exclude IDs
        if ($request->has("exclude")) {
            $excludeIds = explode(",", $request->get("exclude"));
            $query->whereNotIn("id", $excludeIds);
        }

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where("name", "like", "%{$search}%")
                    ->orWhereHas("category", function ($q) use ($search) {
                        $q->where("name", "like", "%{$search}%");
                    })
                    ->orWhere("description", "like", "%{$search}%")
                    ->orWhere("dimensions", "like", "%{$search}%");
            });
        }

        $products = $query->paginate($perPage);
        return response()->json($products);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                "name" => "required|string|max:255",
                "category_id" => "required|exists:categories,id",
                "dimensions" => "nullable|string",
                "description" => "nullable|string",
                "is_featured" => "boolean",
                "img" => "required|image|mimes:jpeg,png,jpg,gif|max:2048",
                "additional_images.*" => "image|mimes:jpeg,png,jpg,gif|max:2048"
            ]);

            if ($request->hasFile("img")) {
                $mainImage = $request->file("img");
                $mainImageName = time() . "_" . $mainImage->getClientOriginalName();
                $path = $mainImage->storeAs('products', $mainImageName, 'public');
                $validatedData["img_url"] = $path;
            }

            $product = Product::create($validatedData);

            if ($request->hasFile("additional_images")) {
                foreach ($request->file("additional_images") as $index => $image) {
                    $imageName = time() . "_" . $index . "_" . $image->getClientOriginalName();
                    $path = $image->storeAs('products', $imageName, 'public');
                    
                    ProductImage::create([
                        "product_id" => $product->id,
                        "image_url" => "products/" . $imageName,
                        "order" => $index
                    ]);
                }
            }

            return response()->json($product->load(["category", "images"]), 201);
        } catch (\Exception $e) {
            Log::error("Error creating product: " . $e->getMessage());
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $product = Product::with(["category", "images"])->findOrFail($id);
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);

            $validatedData = $request->validate([
                "name" => "nullable|string|max:255",
                "category_id" => "nullable|exists:categories,id",
                "dimensions" => "nullable|string",
                "description" => "nullable|string",
                "is_featured" => "nullable|boolean",
                "featured_order" => "nullable|integer",
                "img" => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048",
                "additional_images.*" => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048"
            ]);

            // Handle featured status change
            if (isset($validatedData['is_featured'])) {
                if ($validatedData['is_featured']) {
                    // If making featured and no order specified, put at the end
                    if (!isset($validatedData['featured_order'])) {
                        $validatedData['featured_order'] = Product::where('is_featured', true)->max('featured_order') + 1;
                    }
                } else {
                    // If removing from featured, clear the order
                    $validatedData['featured_order'] = null;
                }
            }

            if ($request->hasFile("img")) {
                if ($product->img_url) {
                    \Storage::disk('public')->delete($product->img_url);
                }

                $mainImage = $request->file("img");
                $mainImageName = time() . "_" . $mainImage->getClientOriginalName();
                $path = $mainImage->storeAs('products', $mainImageName, 'public');
                $validatedData["img_url"] = $path;
            }

            $product->update($validatedData);

            if ($request->hasFile("additional_images")) {
                foreach ($product->images as $image) {
                    if ($image->image_url) {
                        \Storage::disk('public')->delete($image->image_url);
                    }
                    $image->delete();
                }

                foreach ($request->file("additional_images") as $index => $image) {
                    $imageName = time() . "_" . $index . "_" . $image->getClientOriginalName();
                    $path = $image->storeAs('products', $imageName, 'public');
                    
                    ProductImage::create([
                        "product_id" => $product->id,
                        "image_url" => "products/" . $imageName,
                        "order" => $index
                    ]);
                }
            }

            return response()->json($product->load(["category", "images"]));
        } catch (\Exception $e) {
            Log::error("Error updating product: " . $e->getMessage());
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Product::with("images")->findOrFail($id);

            if ($product->img_url && file_exists(public_path($product->img_url))) {
                unlink(public_path($product->img_url));
            }

            foreach ($product->images as $image) {
                if (file_exists(public_path($image->image_url))) {
                    unlink(public_path($image->image_url));
                }
            }

            $product->delete();
            return response()->json(["message" => "Product deleted successfully"]);
        } catch (\Exception $e) {
            Log::error("Error deleting product: " . $e->getMessage());
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }
}