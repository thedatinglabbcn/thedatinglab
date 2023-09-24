<?php

namespace App\Http\Controllers\Api;
use App\Models\User;
use App\Models\Preference;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Storage;



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
        'password' => 'required|min:6',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'birthday' => 'nullable|date',
        'smokes' => 'required|in:Sí,No,Socialmente',
        'wantsChildren' => 'required|in:Sí,No,Algún día',
    ]);

        $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();

        $user = new User([
            'name' => $request->input('name'),
            'lastname' => $request->input('lastname'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'image' => $imageName,
        ]);

        Storage::disk('public')->put($imageName, file_get_contents($request->image));

        $user->save();

        $preference = new Preference([
            'birthday' => $request->input('birthday'),
            'smokes' => $request->input('smokes'),
            'wantsChildren' => $request->input('wantsChildren'),
        ]);

        $user->preferences()->save($preference);
        $token = $user->createToken('auth_token')->plainTextToken;
        
        $matchingUsers = User::whereHas('preferences', function ($query) use ($request) {
            $query->where('smokes', $request->input('smokes'))
                ->where('wantsChildren', $request->input('wantsChildren'));
        })->where('id', '!=', $user->id)->get();

        \Illuminate\Support\Facades\Log::info('Contenido de $preference:', ['preference' => $preference]);
        \Illuminate\Support\Facades\Log::info('Contenido de $matchingUsers:', ['matchingUsers' => $matchingUsers]);
        
        return response()->json([
            'message' => 'Usuario y preferencia creados correctamente',
            'user' => $user,
            'token' => $token,
            'preference' => $preference,
            'matchingUsers' => $matchingUsers,
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