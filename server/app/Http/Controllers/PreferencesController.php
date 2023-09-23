<?php

namespace App\Http\Controllers;

use App\Models\Preference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PreferencesController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'gender' => ['required', 'in:Hombre,Mujer,Otro'],
            'looksFor' => ['required', 'in:Hombre,Mujer,Otro'],
            'preferences1' => ['required', 'in:Netflix,Eventos,Deporte,Escapadas,Todas,Otras'],
            'preferences2' => ['required', 'in:Alcohol,Infusiones,NoAlcohol,Según,Ninguna'],
            'catsDogs' => ['required', 'in:Gatos,Perros,Todos,DeAmigos'],
        ]);

        $user = Auth::user();
        $preference = new Preference([
            'gender' => $request->input('gender'),
            'looksFor' => $request->input('looksFor'),
            'preferences1' => $request->input('preferences1'),
            'preferences2' => $request->input('preferences2'),
            'catsDogs' => $request->input('catsDogs'),
            'user_id' => $user->id
        ]);

        $preference->save();

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
