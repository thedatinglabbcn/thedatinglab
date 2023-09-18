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
            'name' => 'required',
            'lastname' => 'required',
            'age' => 'required',
            'email' => 'required|email',
            'password' =>'required',
            //'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            //'quieresHijos' => 'required',
            //'fumas' => 'required',
        ]);
        
       
        $user = new User();
        $user->name = $request->name;
        $user->lastname = $request->lastname;
        $user->age = $request->age;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        //$user->quieresHijos = $request->input('quieresHijos');
        //$user->fumas = $request->input('fumas');
        $user->save();

        // if ($request->hasFile('image')) {
        //     $image = $request->file('image');
        //     $imageName = time() . '.' . $image->getClientOriginalExtension();
        //     $image->storeAs('public/images/', $imageName);
        //     $user['image'] = ('images/' . $imageName);
        
        return response()->json([
            'message' => 'Usuario creado correctamente',
            'user' => $user,
            //'image_url' => Storage::url('public/images/' . $imageName)
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
            'msg' => 'Usuario desconectado exitosamente'	
        ], 200);
    }  
}