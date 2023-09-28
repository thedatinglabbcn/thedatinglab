<?php

namespace App\Http\Controllers;

use App\Models\Preference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PreferencesController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gender' => ['required', 'in:Hombre,Mujer,Otro'],
            'looksFor' => ['required', 'in:Hombre,Mujer,Otro'],
            'preferences1' => ['required', 'in:Netflix,Eventos,Deporte,Escapadas,Todas,Otras'],
            'preferences2' => ['required', 'in:Alcohol,Infusiones,NoAlcohol,Según,Ninguna'],
            'catsDogs' => ['required', 'in:Gatos,Perros,Todos,DeAmigos'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ], 422);
        } else {
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
}

}
