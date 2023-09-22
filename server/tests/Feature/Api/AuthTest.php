<?php

namespace Tests\Feature\Api;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;

use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;
    /**
     * Should create a new user.
     */
    public function test_user_can_register(): void
    {
        $this->postJson('api/register', [
            'name' => 'Denise',
            'lastname' => 'Garcia',
            'email' => 'denise@email.com',
            'email_verified_at' => '2021-10-12 00:00:00',
            'password' => Hash::make('123456789'),
            'image' => 'denise.jpg',
            'smokes' => 'No',
            'wantsChildren' => 'Sí',
        ]);
        
        $this->assertCount(0, User::all());
            
    }

    public function test_user_can_login(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('123456789')
        ]);

        $response = $this->postJson('api/login', [
            'email' => $user->email,
            'password' => '123456789'
        ]);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'msg' => 'Usuario conectado exitosamente'
        ]);

    }

    public function test_user_can_logout(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('123456789')
        ]);

        $this->postJson('api/login', [
            'email' => $user->email,
            'password' => '123456789'
        ]);

        Sanctum::actingAs($user, ['*']);


        $response = $this->postJson('api/logout');
        $response->assertStatus(200);
        $response->assertJsonFragment([
            'msg' => 'Usuario desconectado exitosamente'
        ]);
    }
}
