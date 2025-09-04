<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $query = Testimonial::query();
        
        // Handle search
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('position', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }
        
        // Handle status filter
        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        // Order by display_order if not searching
        if (!$request->has('search')) {
            $query->orderBy('display_order');
        }

        $testimonials = $request->has('per_page')
            ? $query->paginate($request->input('per_page'))
            : $query->get();

        return response()->json($testimonials);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'position' => 'nullable|string|max:255',
                'content' => 'required|string',
                'img' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'is_active' => 'boolean',
                'display_order' => 'nullable|integer'
            ]);

            if ($request->hasFile('img')) {
                $mainImage = $request->file('img');
                $mainImageName = time() . '_' . $mainImage->getClientOriginalName();
                $path = $mainImage->storeAs('testimonials', $mainImageName, 'public');
                $validatedData['img_url'] = $path;
            }

            // If no display_order provided, append to the end
            if (!isset($validatedData['display_order'])) {
                $validatedData['display_order'] = Testimonial::max('display_order') + 1;
            }

            $testimonial = Testimonial::create($validatedData);
            return response()->json($testimonial, 201);
        } catch (\Exception $e) {
            Log::error('Error creating testimonial: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show(Testimonial $testimonial)
    {
        return response()->json($testimonial);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'string|max:255',
                'position' => 'nullable|string|max:255',
                'content' => 'string',
                'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'is_active' => 'boolean',
                'display_order' => 'nullable|integer'
            ]);

            if ($request->hasFile('img')) {
                if ($testimonial->img_url) {
                    \Storage::disk('public')->delete($testimonial->img_url);
                }

                $mainImage = $request->file('img');
                $mainImageName = time() . '_' . $mainImage->getClientOriginalName();
                $path = $mainImage->storeAs('testimonials', $mainImageName, 'public');
                $validatedData['img_url'] = $path;
            }

            $testimonial->update($validatedData);
            return response()->json($testimonial);
        } catch (\Exception $e) {
            Log::error('Error updating testimonial: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(Testimonial $testimonial)
    {
        try {
            if ($testimonial->img_url) {
                \Storage::disk('public')->delete($testimonial->img_url);
            }
            
            $testimonial->delete();
            return response()->json(['success'=>true], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting testimonial: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function reorder(Request $request)
    {
        try {
            $validated = $request->validate([
                'testimonials' => 'required|array',
                'testimonials.*.id' => 'required|exists:testimonials,id',
                'testimonials.*.display_order' => 'required|integer'
            ]);

            foreach ($validated['testimonials'] as $item) {
                Testimonial::where('id', $item['id'])->update([
                    'display_order' => $item['display_order']
                ]);
            }

            return response()->json(['message' => 'Testimonials reordered successfully']);
        } catch (\Exception $e) {
            Log::error('Error reordering testimonials: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
