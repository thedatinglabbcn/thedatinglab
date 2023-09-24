<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'required|string|max:500',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ], 422);
        } else {
            $user = Auth::user();

            $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();

            Storage::disk('public')->put($imageName, file_get_contents($request->file('image')));

            $profile = new Profile([
                'description' => $request->input('description'),
                'image' => $imageName,
                'user_id' => $user->id,
            ]);

            $profile->save();

            return response()->json([
                'message' => 'Perfil creado con éxito',
            ], 200);
        }
    }
}
