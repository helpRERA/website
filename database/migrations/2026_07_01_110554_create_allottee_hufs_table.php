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
        Schema::create('allottee_hufs', function(Blueprint $table){

        $table->id();
        $table->foreignId('agreement_id')
            ->constrained()
            ->cascadeOnDelete();

        $table->string('karta_name')->nullable();
        $table->string('karta_aadhaar')->nullable();
        $table->string('parent_name')->nullable();
        $table->integer('age')->nullable();

        $table->string('family_name')->nullable();

        $table->string('pan')->nullable();
        $table->text('place')->nullable();
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('allottee_hufs');
    }
};
