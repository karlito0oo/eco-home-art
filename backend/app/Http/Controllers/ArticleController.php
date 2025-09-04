<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Article::query();
        
        // Handle search
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }
        
        // Handle status filter
        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        return $query->paginate($request->input('per_page', 10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'content' => 'required|string',
                'img' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'is_active' => 'boolean'
            ]);

            if ($request->hasFile('img')) {
                $mainImage = $request->file('img');
                $mainImageName = time() . '_' . $mainImage->getClientOriginalName();
                $path = $mainImage->storeAs('articles', $mainImageName, 'public');
                $validatedData['img_url'] = $path;
            }

            $article = Article::create($validatedData);
            return response()->json($article, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating article: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return $article;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'string|max:255',
                'description' => 'string',
                'content' => 'string',
                'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'is_active' => 'boolean'
            ]);

            if ($request->hasFile('img')) {
                if ($article->img_url) {
                    \Storage::disk('public')->delete($article->img_url);
                }

                $mainImage = $request->file('img');
                $mainImageName = time() . '_' . $mainImage->getClientOriginalName();
                $path = $mainImage->storeAs('articles', $mainImageName, 'public');
                $validatedData['img_url'] = $path;
            }

            $article->update($validatedData);
            return $article;
        } catch (\Exception $e) {
            \Log::error('Error updating article: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(null, 200);
    }
}
