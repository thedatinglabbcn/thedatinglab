<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'required|string|max:255',
            'vitalMoment' => 'required|string|max:255',
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
                'vitalMoment' => $request->input('vitalMoment'),
                'image' => $imageName,
            ]);

            $profile->save();

            DB::table('users')
              ->where('id', $user->id)
              ->update(['profile_id' => $profile->id]);

            return response()->json([
                'message' => 'Perfil creado con éxito',
                'profile_id' => $profile->id
            ], 200);
        }
    }

    public function show(string $id)
    {
        $profile = Profile::find($id);

        if (!$profile) {
            return response()->json([
            'message' => 'Perfil no encontrado',
            ], 404);
        }

        $userName = $profile->user->name;

    return response()->json([
        'profile' => $profile,
        'userName' => $userName
    ], 200);
    }

    public function update(Request $request, $id)
    {
    
        $profile = Profile::find($id);

        if (!$profile) {
            return response()->json([
                'message' => 'Perfil no encontrado',
            ], 404);
        }

    
        $user = Auth::user();
        if ($profile->id !== $user->profile->id) {
            return response()->json([
                'message' => 'No tienes permiso para editar este perfil',
            ], 403);
        }

    
        if ($request->has('description')) {
            $profile->description = $request->input('description');
        }

        if ($request->has('vitalMoment')) {
            $profile->vitalMoment = $request->input('vitalMoment');
        }

        
        if ($request->hasFile('image')) {
            $imageName = Str::random(32) . "." . $request->file('image')->getClientOriginalExtension();
            Storage::disk('public')->put($imageName, file_get_contents($request->file('image')));
            $profile->image = $imageName;
        }

        $profile->save();

        return response()->json([
            'message' => 'Perfil actualizado con éxito',
        ], 200);
    }

}
