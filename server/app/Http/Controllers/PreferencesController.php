<?php

namespace App\Http\Controllers;

use App\Models\Preference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PreferencesController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'birthdate' => ['required', 'date', 'before:2005-01-01'],
            'ageRange' => ['required', 'in:18-25,26-35,36-45,46-55'],
            'gender' => ['required', 'in:Hombre,Mujer,Fluido'],
            'looksFor' => ['required', 'in:Hombre,Mujer,Fluido'],
            'hasChildren' => ['required', 'in:Sí,No'],
            'wantsFamily' => ['required', 'in:Sí,No'],
            'datesParents' => ['required', 'in:Sí,No,No me lo he planteado'],
            'sexoAffective' => ['required', 'in:Monógama,Abierta,Amigos con derecho a roce,Lo que surja,Casual'],
            'heartState' => ['required', 'in:Totalmente roto,Con ganas de compartir,Se siente solo,Feliz y palpitante,Despechadísimo'],
            'preferences1' => ['required', 'in:Netflix,Eventos,Deporte,Escapadas,Todas,Otras'],
            'preferences2' => ['required', 'in:Alcohol,Bebidas calientes,Refrescos,Según,Ninguna'],
            'catsDogs' => ['required', 'in:Gatos,Perros,Todos,De amigos'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages(),
            ], 422);
        } else {
        
        $user = Auth::user();
        $preference = new Preference([
            'birthdate' => $request->input('birthdate'),
            'ageRange' => $request->input('ageRange'),
            'gender' => $request->input('gender'),
            'looksFor' => $request->input('looksFor'),
            'hasChildren' => $request->input('hasChildren'),
            'wantsFamily' => $request->input('wantsFamily'),
            'datesParents' => $request->input('datesParents'),
            'sexoAffective' => $request->input('sexoAffective'),
            'heartState' => $request->input('heartState'),
            'preferences1' => $request->input('preferences1'),
            'preferences2' => $request->input('preferences2'),
            'catsDogs' => $request->input('catsDogs'),
        ]);

        $preference->save();

        DB::table('users')
              ->where('id', $user->id)
              ->update(['preference_id' => $preference->id]);

        return response()->json([
            'message' => 'Preferencia creada correctamente'
        ], 201);
    }
}

}
