<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Event;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

class EventTest extends TestCase
{

    use RefreshDatabase;
    /**
     * Test gel all events
     */
    public function test_guest_can_see_all_events(): void
    {
     $this->withExceptionHandling();

     Event::factory()->create();

     $response = $this->getJson('api/event');

     $response->assertStatus(200)
     ->assertJsonCount(1);

    }

    public function test_auth_user_attend_to_a_event()
    {
        $this->withExceptionHandling();

        $user = User::factory()->create([
            'name' => 'John Doe',
            
        ]);

        Sanctum::actingAs($user);

        $event = Event::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->postJson("api/event/attendance/{$event->id}");


        $response->assertJsonFragment(['res' => true])

            
            ->assertStatus(200);
            // $this->assertDatabaseHas('event_user', [
            //     'user_id' => $user->id,
            //     'event_id' => $event->id,
            // ]);
            $this->assertTrue($event->confirmAttendance->contains($user));



    }
}
