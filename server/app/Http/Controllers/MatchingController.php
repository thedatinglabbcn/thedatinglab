<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class MatchingController extends Controller
{
    public function getMatches()
    {
        try {
            $user = Auth::user();

            $userPreference = $user->preference; 

            if (!$user->preference) {
                return response()->json(['type' => 'preferences'], 404);
            }

            $weights = json_decode(file_get_contents(resource_path('config/weights.json')), true);


            $matches = User::findMatchesForUser($user);

            $response = [];

            if ($matches->isEmpty()) {
                return response()->json(['type' => 'matches'], 404);
            }

            foreach ($matches as $match) {
                $matchingPercentage = ceil($this->calculateMatchingPercentage($userPreference, $match->preference, $weights));

                $response[] = [
                    'name' => $match->name,
                    'birthdate' => $match->preference->birthdate,
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
        $fields = array_keys($userPreference->getAttributes());

        $fieldsToExclude = ['id', 'created_at', 'updated_at', 'gender', 'looksFor', 'birthdate', 'ageRange', 'hasChildren'];
        $fields = array_diff($fields, $fieldsToExclude);

        return $fields;
    }

    private function calculateMatchingPercentage($userPreference, $matchPreference, $weights)
{
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
