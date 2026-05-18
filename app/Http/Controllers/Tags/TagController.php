<?php

namespace App\Http\Controllers\Tags;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function search(Request $request)
    {
        if (!$request->filled('search')) {
            return response()->json([]);
        }
        $search = $request->search;
        $tags = Tag::where('tag', 'like', '%' . $search . '%')
            ->limit(5)
            ->get();
        return response()->json($tags);
    }
}
