<?php

namespace Database\Factories;

use App\Models\Profile;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProfileFactory extends Factory
{
    protected $model = Profile::class;

    public function definition()
    {
        return [
            'description' => $this->faker->sentence,
            'vitalMoment' => $this->faker->sentence,
            'image' => 'profile-image.jpg', // Puedes ajustar esto según tus necesidades
        ];
    }
}