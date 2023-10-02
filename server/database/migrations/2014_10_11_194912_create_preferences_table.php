<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('preferences', function (Blueprint $table) {
            $table->id();
            $table->enum('gender', ['Hombre', 'Mujer', 'Fluido', 'Otro']);
            $table->enum('looksFor', ['Hombre', 'Mujer', 'Fluido', 'Otro']);
            $table->enum('hasChildren', ['Sí', 'No']);
            $table->enum('datesParents', ['Sí', 'No', 'No me lo he planteado']);
            $table->enum('sexoAffective', ['Monógama', 'Abierta', 'Amigos con derech@ a roce', 'Lo que surja', 'Casual']);
            $table->enum('heartState', ['Totalmente roto', 'Con ganas de compartir', 'Se siente solo', 'Feliz y palpitante', 'Despechadísimo']);
            $table->enum('topValue', ['Libertad', 'Honestidad', 'Transparencia', 'Empatía', 'Comunicación', 'Responsabilidad', 'Voluntad', 'Diversión', 'Respeto', 'Gratitud', 'Confianza', 'Amor', 'Bondad', 'Positividad', 'Valentía', 'Cuidado', 'Alegría y sentido del humor']);
            $table->enum('preferences1', ['Netflix', 'Eventos', 'Deporte', 'Escapadas', 'Todas', 'Otras']);
            $table->enum('preferences2', ['Alcohol','Infusiones','NoAlcohol','Según','Ninguna']);
            $table->enum('catsDogs', ['Gatos', 'Perros', 'Todos', 'DeAmigos']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preferences');
    }
};
