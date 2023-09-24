<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Preference;
use App\Models\Profile;

class MatchingController extends Controller
{
    public function getMatches()
    {
        // Obtén el usuario autenticado
        $user = auth()->user();

        // Obtén las preferencias del usuario autenticado
        $userPreferences = $user->preferences;

        // Si el usuario no tiene preferencias, puedes manejar este caso como desees
        if (!$userPreferences) {
            return response()->json(['message' => 'El usuario no tiene preferencias.']);
        }

        // Realiza la consulta para encontrar coincidencias basadas en las preferencias
        $matches = User::whereHas('preferences', function ($query) use ($userPreferences) {
            $query->where('looksFor', $userPreferences->gender);
        })->get();

        // Preparar la respuesta con los datos requeridos (name, description, image)
        $response = [];
        foreach ($matches as $match) {
            $response[] = [
                'name' => $match->name,
                'description' => $match->profile->description,
                'image' => $match->profile->image,
            ];
        }

        return response()->json(['matches' => $response]);
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
