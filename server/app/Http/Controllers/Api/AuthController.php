<?php

namespace App\Http\Controllers\Api;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request)
{
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6',
    ]);

        $user = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ]);

        $user->save();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Usuario y preferencia creados correctamente',
            'user' => $user,
            'token' => $token,
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
            ], 401);
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
            'msg' => 'Usuario desconectado exitosamente'	
        ], 200);
    } 
} 