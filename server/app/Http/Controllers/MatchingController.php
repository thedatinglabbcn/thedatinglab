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
            $user = Auth::user();

            if (!$user->preference) {
                return response()->json(['type' => 'preferences'], 404);
            }

            $userPreference = $user->preference; 

            $userGender = $userPreference->gender;
            $userLooksFor = $userPreference->looksFor;
            $userAgeRange = $userPreference->ageRange;
            
            $weights = [
                'gender' => 0,
                'looksFor' => 0,
                'birthdate' => 0,
                'ageRange' => 0,
                'hasChildren' => 0,
                'datesParents' => 2,
                'wantsFamily' => 2,
                'sexoAffective' => 2,
                'heartState' => 1,
                'preferences1' => 1,
                'preferences2' => 0.5,
                'catsDogs' => 0.5,
            ];

            $matches = User::whereHas('preference', function ($query) use ($userGender, $userLooksFor, $userAgeRange) {
                $query->where('gender', $userLooksFor)
                    ->where('looksFor', $userGender)
                    ->where('ageRange', $userAgeRange);
            })
            ->where('id', '!=', $user->id)
            ->get();

            $response = [];

            if ($matches->isEmpty()) {
                return response()->json(['type' => 'matches'], 404);
            }

            foreach ($matches as $match) {
                $matchingPercentage = ceil($this->calculateMatchingPercentage($userPreference, $match->preference, $weights));

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

    private function getPreferenceFields($userPreference)
    {
        // Obtén dinámicamente la lista de campos de preferencias disponibles
        $fields = array_keys($userPreference->getAttributes());

        // Elimina los campos que no quieres incluir en el cálculo
        $fieldsToExclude = ['id', 'created_at', 'updated_at', 'gender', 'looksFor', 'birthdate', 'ageRange', 'hasChildren', 'datesParents'];
        $fields = array_diff($fields, $fieldsToExclude);

        return $fields;
    }

    private function calculateMatchingPercentage($userPreference, $matchPreference, $weights)
{
    // $totalFields = count($this->getPreferenceFields($userPreference));
    $matchingFields = 0;


    foreach ($this->getPreferenceFields($userPreference) as $field) {
        if ($userPreference->$field === $matchPreference->$field) {
            $matchingFields += $weights[$field]; 
        }
    }

    $maxPossibleScore = array_sum($weights);

    $matchingPercentage = ($matchingFields / $maxPossibleScore) * 100;

    return $matchingPercentage;
}

}
