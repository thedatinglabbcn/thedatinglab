<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image' => fake()->imageUrl(), // Genera una URL de imagen aleatoria.
            'date' => fake()->date(),
            'time' => fake()->time(),
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(), 
            'user_id' => function () {
                return \App\Models\User::factory()->create()->id; // Crea un usuario y obtén su ID.
            },
            'privacy' => $this->faker->randomElement(['public', 'private']),           
        ];
    }
}
