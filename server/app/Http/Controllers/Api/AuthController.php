<?php

namespace App\Http\Controllers\Api;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cookie;



class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' =>'required|min:6',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'acceptsTerms' => 'required|boolean',
            'wantsInfo' => 'required|boolean'
        ]);
        
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/images/', $imageName);
        } else {
            $imageName = null;
        }

        $user = new User([
            'name' => $request->input('name'),
            'lastname' => $request->input('lastname'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'image' => $imageName, // Assign the image name here
            'acceptsTerms' => $request->input('acceptsTerms'),
            'wantsInfo' => $request->input('wantsInfo', false),
        ]);

        $user->save();
        
        return response()->json([
            'message' => 'Usuario creado correctamente',
            'user' => $user,
        ], 201);
        }

    /**
     * Login user and create token.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' =>'required'
        ]);

       $user = User::where('email', $request->email)->first();
       if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'msg' => 'Usuario o contraseña incorrectos'
            ],);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        $cookie = cookie('token', $token, 60 * 24);

        return response()->json([
            'msg' => 'Usuario conectado exitosamente',
            'token' => $token
        ], 200)->withCookie($cookie);
    }

        public function logout(Request $request)
        {
            $request->user()->currentAccessToken()->delete();
            return response()->json([
            'msg' => 'Se ha cerrado la sesión'	
        ], 200);
    }  
}