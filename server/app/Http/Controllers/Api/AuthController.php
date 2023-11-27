<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Preference;
use App\Models\Profile;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'privacyPolicies' => 'required|accepted',
            'over18' => 'required|accepted',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ], 422);
        } else {    

            $preferenceId = $request->input('preference_id');
            $profileId = $request->input('profile_id');

    if ($preferenceId !== null && $profileId !== null) {
        $preference = Preference::find($preferenceId);
        $profile = Profile::find($profileId);
    } else {
        $preference = null;
        $profile = null;
    }

    $user = new User([
        'name' => $request->input('name'),
        'email' => $request->input('email'),
        'password' => Hash::make($request->input('password')),
        'profile_id' => $profile ? $profile->id : null,
        'preference_id' => $preference ? $preference->id : null,
    ]);

$user->save();

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Usuario creado correctamente',
                'user' => $user,
                'token' => $token,
            ], 201);
        }
    } 

    public function login(Request $request)
{
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'password' => 'required'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'validation_errors' => $validator->messages(),
        ], 422);
    }

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'msg' => 'Usuario o contraseña incorrectos'
        ], 401);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    $cookie = cookie('token', $token, 60 * 24);

    $isAdmin = $user->hasRole('admin');

    return response()->json([
        'msg' => 'Usuario conectado exitosamente',
        'user' => [
            'email' => $user->email,
            'isAdmin' => $isAdmin,
            'profile_id' => $user->profile_id,
            'id' => $user->id,
        ],
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

    public function getAllUsers()
{
    $users = User::all();

    return response()->json([
        'users' => $users,
    ], 200);
}
}
