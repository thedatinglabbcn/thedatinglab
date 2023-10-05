<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Preference;
use App\Models\Profile;
use App\Models\User;

class MatchingControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_matching_users_endpoint()
    {
        // Crear un usuario de prueba y sus dependencias
        $preference = Preference::factory()->create();
        $profile = Profile::factory()->create();
        $user = User::factory()->create([
            'preference_id' => $preference->id,
            'profile_id' => $profile->id,
            
        ]);

        // Actuar como el usuario creado
       
        $response = $this->getJson('/api/matching-users');
        // Asegurar que el endpoint devuelva un estado 200
        $response->assertStatus(200);
    }

    public function test_matching_users_endpoint_returns_correct_matches()
{
    // Crear un usuario con un conjunto específico de preferencias
    $user1Preference = Preference::factory()->create([
        'gender' => 'Mujer',
        'looksFor' => 'Hombre',
        'hasChildren' => 'No',
        'wantsFamily' => 'No',
        'datesParents' => 'No',
        'sexoAffective' => 'Monógama',
        'heartState' => 'Con ganas de compartir',
        'preferences1' => 'Netflix',
        'preferences2' => 'Según',
        'catsDogs' => 'Gatos',
     
    ]);

    $user1Profile = Profile::factory()->create();
    $user1 = User::factory()->create([
        'preference_id' => $user1Preference->id,
        'profile_id' => $user1Profile->id,
    ]);

    // Crear otro usuario que cumpla con las preferencias del primer usuario
    $user2Preference = Preference::factory()->create([
        'gender' => 'Hombre',
        'looksFor' => 'Mujer',
        'hasChildren' => 'No',
        'wantsFamily' => 'No',
        'datesParents' => 'No',
        'sexoAffective' => 'Monógama',
        'heartState' => 'Con ganas de compartir',
        'preferences1' => 'Netflix',
        'preferences2' => 'Según',
        'catsDogs' => 'Gatos',
     
    ]);

    $user2Profile = Profile::factory()->create();
    $user2 = User::factory()->create([
        'preference_id' => $user2Preference->id,
        'profile_id' => $user2Profile->id,
    ]);

    // Crear un tercer usuario que no cumple con las preferencias del primer usuario
    $user3Preference = Preference::factory()->create([
        'gender' => 'Mujer',
        'looksFor' => 'Hombre',
        'hasChildren' => 'Si',
        'wantsFamily' => 'Si',
        'datesParents' => 'No',
        'sexoAffective' => 'Abierta',
        'heartState' => 'Con ganas de compartir',
        'preferences1' => 'Netflix',
        'preferences2' => 'Según',
        'catsDogs' => 'Gatos',
     
    ]);

    $user3Profile = Profile::factory()->create();
    $user3 = User::factory()->create([
        'preference_id' => $user3Preference->id,
        'profile_id' => $user3Profile->id,
    ]);

    // Actuar como el primer usuario
    $this->actingAs($user1, 'api');

    // Hacer una solicitud al endpoint de coincidencias
    $response = $this->getJson('/api/matching-users');

    // Verificar que la respuesta contiene al segundo usuario, pero no al tercero
    $response->assertStatus(200);
    $response->assertJsonPath('matches.0.name', $user2->name);
    $response->assertJsonMissing(['matches' => [['name' => $user3->name]]]);
}

}
