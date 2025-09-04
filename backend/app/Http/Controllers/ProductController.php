<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get("per_page", 10);
        $search = $request->get("search", null);

        $query = Product::query()->with(["category", "images"]);

        if ($request->has("category_id") && !empty($request->category_id)) {
            $query->where("category_id", $request->category_id);
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
                $mainImage->move(public_path("products"), $mainImageName);
                $validatedData["img_url"] = "products/" . $mainImageName;
            }

            $product = Product::create($validatedData);

            if ($request->hasFile("additional_images")) {
                foreach ($request->file("additional_images") as $index => $image) {
                    $imageName = time() . "_" . $index . "_" . $image->getClientOriginalName();
                    $image->move(public_path("products"), $imageName);
                    
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
                "name" => "required|string|max:255",
                "category_id" => "required|exists:categories,id",
                "dimensions" => "nullable|string",
                "description" => "nullable|string",
                "is_featured" => "boolean",
                "img" => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048",
                "additional_images.*" => "image|mimes:jpeg,png,jpg,gif|max:2048"
            ]);

            if ($request->hasFile("img")) {
                if ($product->img_url && file_exists(public_path($product->img_url))) {
                    unlink(public_path($product->img_url));
                }

                $mainImage = $request->file("img");
                $mainImageName = time() . "_" . $mainImage->getClientOriginalName();
                $mainImage->move(public_path("products"), $mainImageName);
                $validatedData["img_url"] = "products/" . $mainImageName;
            }

            $product->update($validatedData);

            if ($request->hasFile("additional_images")) {
                foreach ($product->images as $image) {
                    if (file_exists(public_path($image->image_url))) {
                        unlink(public_path($image->image_url));
                    }
                    $image->delete();
                }

                foreach ($request->file("additional_images") as $index => $image) {
                    $imageName = time() . "_" . $index . "_" . $image->getClientOriginalName();
                    $image->move(public_path("products"), $imageName);
                    
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