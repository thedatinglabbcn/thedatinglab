<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Event;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\Hash;

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
            $this->assertTrue($event->confirmAttendance->contains($user));
            
    }
    public function test_user_can_confirm_attendance_to_event(): void
    {
           $user = User::factory()->create([
            'password' => Hash::make('123456789')
        ]);

        Sanctum::actingAs($user, ['*']);

        $event = Event::factory()->create();

        $response = $this->postJson("api/event/attendance/{$event->id}");

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'res' => true
        ]);
    }
     public function test_user_can_get_attendees_for_event(): void
     {
         $user = User::factory()->create([
             'password' => Hash::make('123456789')
         ]);

         Sanctum::actingAs($user, ['*']);

         $event = Event::factory()->create();

         $attendees = $event->confirmAttendance->pluck('id')->toArray();

         $response = $this->getJson("api/event/attendance/{$event->id}");

         $response->assertStatus(200);
         $response->assertJsonFragment([
             'attendees' => $attendees
         ]);
     }

     public function test_user_can_get_events_for_user(): void
     {
         $user = User::factory()->create([
             'password' => Hash::make('123456789')
         ]);

         Sanctum::actingAs($user, ['*']);

         $event = Event::factory()->create();

         $event = $user->confirmAttendance->toArray();

         $response = $this->getJson("api/event/user/{$user->id}");

         $response->assertStatus(200);
         $response->assertJsonFragment([
             'event' => $event
         ]);
     }

    

}
