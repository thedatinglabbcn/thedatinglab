<?php

namespace App\Http\Controllers;

use App\Models\Preference;
use Illuminate\Http\Request;

class PreferencesController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'birthday' => 'required|date',
            'wantsChildren' => 'required|in:Sí,No,Algún día',
            'smokes' => 'required|in:Sí,No,Socialmente',
        ]);

        $preference = new Preference([
            'birthday' => $request->input('birthday'),
            'wantsChildren' => $request->input('wantsChildren'),
            'smokes' => $request->input('smokes'),
        ]);

        $preference->save();

        $preferences = Preference::where('wantsChildren', $preference->wantsChildren)
            ->where('smokes', $preference->smokes)
            ->where('birthday', $preference->birthday)
            ->where('id', '!=', $preference->id)
            ->select('id', 'birthday', 'smokes', 'wantsChildren')
            ->get();

        return response()->json([
            'message' => 'Preferencia creada correctamente'
        ], 201);
    }
}
