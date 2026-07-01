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
            Schema::create('garage_details', function(Blueprint $table){

            $table->id();

            $table->foreignId('agreement_id')
                ->constrained()
                ->cascadeOnDelete();


            $table->string('slot_no')->nullable();

            $table->string('area')->nullable();

            $table->decimal('price',12,2)->nullable();


            $table->timestamps();

            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('garage_details');
    }
};
