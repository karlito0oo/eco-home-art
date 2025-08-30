<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller {
   public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search  = $request->get('search', null);

        $query = Product::query();

        // ✅ Apply filtering if search term is provided
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                ->orWhere('categories', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->orWhere('dimensions', 'like', "%{$search}%");
            });
        }

        $products = $query->paginate($perPage);

        return response()->json($products);
    }
    public function store(Request $request) {
        $product = Product::create($request->all());
        return response()->json($product, 201);
    }
    public function show($id) {
        return response()->json(Product::findOrFail($id));
    }
    public function update(Request $request, $id) {
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return response()->json($product);
    }
    public function destroy($id) {
        Product::destroy($id);
        return response()->json(['success' => true]);
    }
}
