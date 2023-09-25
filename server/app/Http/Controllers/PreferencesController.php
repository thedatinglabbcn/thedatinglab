<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Preference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PreferencesController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'birthday' => 'nullable|date',
            'wantsChildren' => 'required|in:Sí,No,Algún día',
            'smokes' => 'required|in:Sí,No,Socialmente',
        ]);

        $user = Auth::user();
        $preference = new Preference([
            'birthday' => $request->input('birthday'),
            'wantsChildren' => $request->input('wantsChildren'),
            'smokes' => $request->input('smokes'),
            'user_id' => $user->id
        ]);

        $preference->save();

        // $preferences = Preference::where('wantsChildren', $preference->wantsChildren)
        //     ->where('smokes', $preference->smokes)
        //     ->where('birthday', $preference->birthday)
        //     ->where('id', '!=', $preference->id)
        //     ->select('id', 'birthday', 'smokes', 'wantsChildren')
        //     ->get();

        return response()->json([
            'message' => 'Preferencia creada correctamente'
        ], 201);
    }

    // public function index()
    // {
    //    $preferences = Preference::all();
    //     return response()->json($preferences);
    // }
    
    // /**
    //  * Display the specified resource.
    //  */
    // public function show(string $id)
    // {
    //     //
    // }
}
