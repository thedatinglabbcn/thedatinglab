<?php

namespace Tests\Feature\Api;

use App\Http\Controllers\MatchingController;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use App\Models\User;
use App\Models\Preference;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\AssertableJson;

class MatchesTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_cannot_get_matches()
    {
        
        $response = $this->getJson('api/matching-users');

      
        $response->assertStatus(401);
    }


    public function test_user_cannot_get_matches_without_preference()
    {
        
        $user = User::create([
            "name" => "Jane Doe",
            "email" => "jane@example.com",
            "password" => Hash::make("password"),
        ]);

        
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/matching-users');

        $response->assertStatus(404);
        $response->assertJson(['type' => 'preferences']);
    }

    public function test_user_cannot_get_empty_matches()
    {
       
        $user = User::factory()->create([
            "name" => "Alice Doe",
            "email" => "alice@example.com",
            "password" => Hash::make("password"),
        ]);

      
        $preference = [
            'birthdate' => '1990-01-01',
            'ageRange' => '26-35',
            'gender' => 'Hombre',
            'looksFor' => 'Mujer',
            'hasChildren' => 'No',
            'wantsFamily' => 'Sí',
            'datesParents' => 'Sí',
            'sexoAffective' => 'Monógama',
            'heartState' => 'Con ganas de compartir',
            'preferences1' => 'Netflix',
            'preferences2' => 'Alcohol',
            'catsDogs' => 'Perros',
        ];

       
        $user->preference()->create($preference);

        
        Sanctum::actingAs($user);

       
        $response = $this->getJson('api/matching-users');

        $response->assertStatus(404);
    }

   

//     public function test_user_can_get_matches()
// {
   
//     $user = User::factory()->create([
//         "name" => "Alice Doe",
//         "email" => " bob@example.com",
//         "password" => Hash::make("password"),
//     ]);

//     $preference = [
//         'birthdate' => '1990-01-01',
//         'ageRange' => '18-25',
//         'gender' => 'Mujer',
//         'looksFor' => 'Mujer',
//         'hasChildren' => 'Sí',
//         'wantsFamily' => 'Sí',
//         'datesParents' => 'No',
//         'sexoAffective' => 'Monógama',
//         'heartState' => 'Con ganas de compartir',
//         'preferences1' => 'Netflix',
//         'preferences2' => 'Alcohol',
//         'catsDogs' => 'Perros',
//     ];

    
//     $user->preference()->create($preference);

    
//     Sanctum::actingAs($user);

    
//     $response = $this->getJson('api/matches');

   
//     $response->assertJsonStructure([
//         'matches' => [
//             '*' => [
//                 'name',
//                 'birthdate',
//                 'description',
//                 'image',
//                 'matchingPercentage',
//             ],
//         ],
//     ]);

    
//     $response->assertStatus(200);
// }


}