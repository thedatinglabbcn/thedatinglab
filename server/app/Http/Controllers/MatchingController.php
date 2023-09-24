<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Preference;
use App\Models\Profile;
use Illuminate\Database\Eloquent\Builder;

class MatchingController extends Controller
{
    public function getMatches()
    {
        $user = auth()->user();

        $userPreferences = $user->preferences;

        $matches = User::whereHas('preferences', function ($query) use ($userPreferences) {
            $query->where('looksFor', $userPreferences->gender);
        })->get();

        $response = [];

        foreach ($matches as $match) {
            $matchingPercentage = ceil($this->calculateMatchingPercentage($userPreferences, $match->preferences));

            $response[] = [
                'name' => $match->name,
                'description' => $match->profile->description,
                'image' => $match->profile->image,
                'matchingPercentage' => $matchingPercentage,
            ];
        }

        return response()->json(['matches' => $response]);
    }

    private function calculateMatchingPercentage($userPreferences, $matchPreferences)
    {
        $totalFields = 3; // Total de campos para comparar
        $matchingFields = 0; // Campos coincidentes

        // Compara cada campo y suma 1 por cada coincidencia
        if ($userPreferences->preferences1 === $matchPreferences->preferences1) {
            $matchingFields++;
        }
        if ($userPreferences->preferences2 === $matchPreferences->preferences2) {
            $matchingFields++;
        }
        if ($userPreferences->catsDogs === $matchPreferences->catsDogs) {
            $matchingFields++;
        }

        // Calcula el porcentaje de coincidencia
        $matchingPercentage = ($matchingFields / $totalFields) * 100;

        return $matchingPercentage;
    }
}



// {
//     public function findMatchingUsers(Request $request)
//     {
//         $user = Auth::user();
//         $userPreferences = $user->preferences;

//         $matchingUsers = [];

//         $otherUsers = User::where('id', '!=', $user->id)->get();

//         foreach ($otherUsers as $otherUser) {
//             $otherUserPreferences = $otherUser->preferences;

//             $matchingPercentage = $this->calculateMatchingPercentage($userPreferences, $otherUserPreferences);

//             if ($matchingPercentage >= 70) {
//                 // Obtener la relación profile del usuario
//                 $profile = $otherUser->profile;

//                 if ($profile) {
//                     $matchingUsers[] = [
//                         'name' => $otherUser->name, // Nombre del usuario
//                         'image' => $profile->image,  // Imagen de la tabla profiles
//                         'description' => $profile->description, // Descripción de la tabla profiles
//                         'matching_percentage' => $matchingPercentage,
//                     ];
//                 }
//             }
//         }

//         return response()->json([
//             'matching_users' => $matchingUsers,
//         ], 200);
//     }


//     private function calculateMatchingPercentage($userPreferences, $otherUserPreferences)
//     {
//         $totalPreferences = count($userPreferences);
//         $matchingCount = 0;

//         foreach ($userPreferences as $userPreference) {
//             foreach ($otherUserPreferences as $otherUserPreference) {
//                 if ($userPreference->gender == $otherUserPreference->gender &&
//                     $userPreference->looksFor == $otherUserPreference->looksFor &&
//                     $userPreference->preferences1 == $otherUserPreference->preferences1 &&
//                     $userPreference->preferences2 == $otherUserPreference->preferences2 &&
//                     $userPreference->catsDogs == $otherUserPreference->catsDogs) {
//                     $matchingCount++;
//                     break;
//                 }
//             }
//         }

//         if ($totalPreferences > 0) {
//             $matchingPercentage = ($matchingCount / $totalPreferences) * 100;
//         } else {
//             $matchingPercentage = 0;
//         }

//         return $matchingPercentage;
//     }
// }
