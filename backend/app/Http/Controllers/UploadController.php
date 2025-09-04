<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048', // max 2MB
        ]);

        $path = $request->file('image')->store('public/articles');
        $url = asset(str_replace('public', 'storage', $path));

        return response()->json([
            'url' => $url
        ]);
    }
}
