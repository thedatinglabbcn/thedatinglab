<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Preference;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Preference>
 */
class PreferenceFactory extends Factory
{
    protected $model = Preference::class;

    public function definition()
    {
        return [
            'birthdate' => fake()->date(),
            'ageRange' => fake()->randomElement(['18-25', '26-35', '36-45', 'Más de 45']),
            'gender' => fake()->randomElement(['Hombre', 'Mujer', 'No binario']),
            'looksFor' => fake()->randomElement(['Hombre', 'Mujer', 'No binario']),
            'hasChildren' => fake()->randomElement(['Sí', 'No']),
            'wantsFamily' => fake()->randomElement(['Sí', 'No']),
            'datesParents' => fake()->randomElement(['Sí', 'No', 'No me lo he planteado']),
            'sexoAffective' => fake()->randomElement(['Monógama', 'Abierta', 'Amigos con derecho a roce', 'Lo que surja', 'Casual']),
            'heartState' => fake()->randomElement(['Totalmente roto', 'Con ganas de compartir', 'Se siente solo', 'Feliz y palpitante', 'Despechadísimo']),
            'preferences1' => fake()->randomElement(['Netflix', 'Eventos', 'Deporte', 'Escapadas', 'Todas', 'Otras']),
            'preferences2' => fake()->randomElement(['Alcohol', 'Bebidas calientes', 'Refrescos', 'Según', 'Ninguna']),
            'catsDogs' => fake()->randomElement(['Gatos', 'Perros', 'Todos', 'De amigos']),
        ];
    }
}
