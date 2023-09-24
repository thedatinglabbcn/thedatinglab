<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Event;

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
}
