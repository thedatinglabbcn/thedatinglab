<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Preference;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\Hash;

class PreferencesTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_preference()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $data = [
            'birthdate' => '1990-01-01',
            'ageRange' => '18-25',
            'gender' => 'Hombre',
            'looksFor' => 'Mujer',
            'hasChildren' => 'No',
            'wantsFamily' => 'Sí',
            'datesParents' => 'Sí',
            'sexoAffective' => 'Monógama',
            'heartState' => 'Feliz y palpitante',
            'preferences1' => 'Netflix',
            'preferences2' => 'Alcohol',
            'catsDogs' => 'Gatos',
        ];

        $response = $this->postJson('api/preferences', $data);

        $response->assertStatus(201)
            ->assertJsonFragment(['message' => 'Preferencia creada correctamente']);

        $this->assertDatabaseHas('preferences', $data);
    }

    public function test_user_cannot_create_preference_with_invalid_data()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $data = [
            'birthdate' => '10-10-2015',
        ];

        $response = $this->postJson('api/preferences', $data);

        $response->assertStatus(422)
            ->assertJsonStructure(['validation_errors']);
    }
}
