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
        Schema::create('land_jdas', function(Blueprint $table){

            $table->id();

            $table->foreignId('agreement_id')
                ->constrained()
                ->cascadeOnDelete();



            $table->string('owner_name')->nullable();


            $table->string('jda_date')->nullable();


            $table->string('reg_no')->nullable();


            $table->string('sub_registrar_office')->nullable();



            $table->timestamps();


            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('land_jdas');
    }
};
