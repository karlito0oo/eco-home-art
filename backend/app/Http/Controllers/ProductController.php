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
        \Log::info('Store Request Data:', [
            'all' => $request->all(),
            'files' => $request->allFiles(),
            'headers' => $request->header()
        ]);
        
        try {
            $data = $request->all();
            
            if ($request->hasFile('img')) {
                $file = $request->file('img');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('products'), $filename);
                $data['img_url'] = 'products/' . $filename;
            }

            $product = Product::create($data);
            return response()->json($product, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating product: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($id) {
        return response()->json(Product::findOrFail($id));
    }

    public function update(Request $request, $id) {
        \Log::info('Update Request Data:', [
            'id' => $id,
            'all' => $request->all(),
            'files' => $request->allFiles(),
            'headers' => $request->header()
        ]);
        
        try {
            $product = Product::findOrFail($id);
            $data = $request->all();

            if ($request->hasFile('img')) {
                $file = $request->file('img');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('products'), $filename);
                $data['img_url'] = 'products/' . $filename;
            }

            $product->update($data);
            return response()->json($product);
        } catch (\Exception $e) {
            \Log::error('Error updating product: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function destroy($id) {
        Product::destroy($id);
        return response()->json(['success' => true]);
    }
}
