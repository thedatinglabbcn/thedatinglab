<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required|string|max:500',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();

        $user = Auth::user();
        $profile = new Profile([
            'description' => $request->input('description'),
            'image' => $imageName,
            'user_id' => $user->id
        ]);
        
        Storage::disk('public')->put($imageName, file_get_contents($request->image));
        
        $profile->save();
}
}