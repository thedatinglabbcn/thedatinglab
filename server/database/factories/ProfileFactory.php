<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Model\Profile;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'description' => fake()->text(255),
            'vitalMoment' => fake()->text(255),
            'image' => fake()->imageUrl(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    
}
