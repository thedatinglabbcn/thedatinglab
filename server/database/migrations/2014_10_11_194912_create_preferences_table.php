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
            $table->date('birthdate');
            $table->enum('ageRange', ['18-25', '26-35', '36-45', 'Más de 45']);
            $table->enum('gender', ['Hombre', 'Mujer', 'No binario']);
            $table->enum('looksFor', ['Hombre', 'Mujer', 'No binario']);
            $table->enum('hasChildren', ['Sí', 'No']);
            $table->enum('wantsFamily', ['Sí', 'No']);
            $table->enum('datesParents', ['Sí', 'No', 'No me lo he planteado']);
            $table->enum('sexoAffective', ['Monógama', 'Abierta', 'Amigos con derecho a roce', 'Lo que surja', 'Casual']);
            $table->enum('heartState', ['Totalmente roto', 'Con ganas de compartir', 'Se siente solo', 'Feliz y palpitante', 'Despechadísimo']);
            $table->enum('preferences1', ['Netflix', 'Eventos', 'Deporte', 'Escapadas', 'Todas', 'Otras']);
            $table->enum('preferences2', ['Alcohol', 'Bebidas calientes', 'Refrescos', 'Según', 'Ninguna']);
            $table->enum('catsDogs', ['Gatos', 'Perros', 'Todos', 'De amigos']);
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
