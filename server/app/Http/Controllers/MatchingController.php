<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Preference;
use App\Models\Profile;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;

class MatchingController extends Controller
{
    public function getMatches()
    {
        try {
            $user = auth()->user();

            if (!$user) {
                throw new \Exception('Usuario no autenticado', 401);
            }

            $userPreferences = $user->preferences;

            if (!$userPreferences) {
                return response()->json(['type' => 'preferences'], 404);
            }

            $userGender = $userPreferences->gender;
            $userLooksFor = $userPreferences->looksFor;
            $userHasChildren = $userPreferences->hasChildren;
            $userDatesParents = $userPreferences->datesParents;

            // Define los pesos para cada campo de preferencias
            $weights = [
                'gender' => 0,
                'looksFor' => 0,
                'hasChildren' => 0,
                'datesParents' => 0,
                'sexoAffective' => 3,
                'heartState' => 2,
                'topValue' => 2,
                'preferences1' => 2,
                'preferences2' => 0.5,
                'catsDogs' => 0.5,
            ];

            $matches = User::whereHas('preferences', function ($query) use ($userGender, $userLooksFor, $userHasChildren, $userDatesParents) {
                $query->where('gender', $userLooksFor)
                    ->where('looksFor', $userGender)
                    ->where(function ($subQuery) use ($userHasChildren, $userDatesParents) {
                        if ($userHasChildren === 'Sí' && ($userDatesParents === 'Sí' || $userDatesParents === 'Tanto faz')) {
                            // El usuario tiene hijos y está dispuesto a salir con padres, se muestran usuarios con y sin hijos que estén dispuestos a salir con usuarios con hijos.
                            $subQuery->whereIn('hasChildren', ['Sí', 'No']);
                            $subQuery->where('datesParents', 'Sí');
                        } elseif ($userHasChildren === 'No') {
                            // El usuario no tiene hijos y está dispuesto a salir con padres, se muestran usuarios CON Y SIN hijos que no quieren salir con usuarios con hijos.
                            $subQuery->where('datesParents', 'Sí');
                            $subQuery->where(function ($subSubQuery) {
                                $subSubQuery->where('hasChildren', 'No')
                                    ->orWhereNull('hasChildren');
                            });
                        } elseif ($userHasChildren === 'Sí' && $userDatesParents === 'No') {
                            // El usuario tiene hijos y no está dispuesto a salir con padres, se muestran usuarios SIN hijos DISPUESTOS A SALIR CON USUARIOS CON HIJOS.
                            $subQuery->where('hasChildren', 'No');
                            $subQuery->where('datesParents', 'Sí');
                        } elseif ($userHasChildren === 'No' && $userDatesParents === 'No') {
                            // El usuario no tiene hijos y no está dispuesto a salir con padres, se muestran usuarios SIN hijos que no quieren salir con usuarios con hijos.
                            $subQuery->where('hasChildren', 'No');
                            $subQuery->where('datesParents', 'No');
                        }
                    });
            })
            ->where('id', '!=', $user->id)
            ->get();

            $response = [];

            if ($matches->isEmpty()) {
                return response()->json(['type' => 'matches'], 404);
            }

            foreach ($matches as $match) {
                $matchingPercentage = ceil($this->calculateMatchingPercentage($userPreferences, $match->preferences, $weights));

                $response[] = [
                    'name' => $match->name,
                    'description' => $match->profile->description,
                    'image' => $match->profile->image,
                    'matchingPercentage' => $matchingPercentage,
                ];
            }

            return response()->json(['matches' => $response], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    private function getPreferenceFields($userPreferences)
    {
        // Obtén dinámicamente la lista de campos de preferencias disponibles
        $fields = array_keys($userPreferences->getAttributes());

        // Elimina los campos que no quieres incluir en el cálculo
        $fieldsToExclude = ['id', 'user_id', 'created_at', 'updated_at', 'gender', 'looksFor', 'hasChildren', 'datesParents'];
        $fields = array_diff($fields, $fieldsToExclude);

        return $fields;
    }

    private function calculateMatchingPercentage($userPreferences, $matchPreferences, $weights)
    {
        $totalFields = count($this->getPreferenceFields($userPreferences));
        $matchingFields = 0;

        // Itera a través de los campos de preferencias y verifica si coinciden, considerando los pesos
        foreach ($this->getPreferenceFields($userPreferences) as $field) {
            if ($userPreferences->$field === $matchPreferences->$field) {
                $matchingFields += $weights[$field]; // Suma el peso correspondiente
            }
        }

        $matchingPercentage = ($matchingFields / ($totalFields * max($weights))) * 100; // Normaliza según el peso máximo

        return $matchingPercentage;
    }
}
