<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Str;
use App\Models\Event;
use Illuminate\Http\Testing\File;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_profile(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $validData = [
            'description' => 'My profile description',
            'vitalMoment' => 'My vital moment',
            'image' => UploadedFile::fake()->image('avatar.jpg'),
        ];

        $response = $this->postJson('api/profile', $validData);

        $response->assertStatus(200)
            ->assertJsonFragment([
                'message' => 'Perfil creado con éxito',
                'profile_id' => 1,
            ]);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'description' => 'Mi perfil',
                'vitalMoment' => 'Mi momento vital',
            ]);

        $this->assertDatabaseHas('profiles', [
            'description' => 'Mi perfil',
            'vitalMoment' => 'Mi momento vital',
        ]);

    }

    public function test_profile_with_invalid_data_cannot_be_created(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);

        $response = $this->postJson('api/profiles', [
            'description' => '',
            'vitalMoment' => '',
            'image' => '',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['description', 'vitalMoment', 'image']);
    }

    public function test_user_can_assist_an_existing_event(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $event = Event::factory()->create();

        $response = $this->postJson("api/event/attendance/{$event->id}");

        $response->assertStatus(200)
            ->assertJsonFragment([
                'res' => true,  
            ]);

        $this->assertDatabaseHas('attendances', [
            'user_id' => $user->id,
            'event_id' => $event->id,
        ]);
    }
    
}
