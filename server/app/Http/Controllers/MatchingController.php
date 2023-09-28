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

            $matches = User::whereHas('preferences', function ($query) use ($userGender, $userLooksFor) {
                $query->where('gender', $userLooksFor)
                    ->where('looksFor', $userGender);
            })
                ->where('id', '!=', $user->id)
                ->get();

            $response = [];

            if ($matches->isEmpty()) {
                return response()->json(['type' => 'matches'], 404);
            }

            foreach ($matches as $match) {
                $matchingPercentage = ceil($this->calculateMatchingPercentage($userPreferences, $match->preferences));

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

    private function calculateMatchingPercentage($userPreferences, $matchPreferences)
    {
        $totalFields = 3; 
        $matchingFields = 0; 

      
        if ($userPreferences->preferences1 === $matchPreferences->preferences1) {
            $matchingFields++;
        }
        if ($userPreferences->preferences2 === $matchPreferences->preferences2) {
            $matchingFields++;
        }
        if ($userPreferences->catsDogs === $matchPreferences->catsDogs) {
            $matchingFields++;
        }

        $matchingPercentage = ($matchingFields / $totalFields) * 100;

        return $matchingPercentage;
    }
}
