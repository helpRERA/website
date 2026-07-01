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
        Schema::create('joint_allottees', function(Blueprint $table){


            $table->id();


            $table->foreignId('agreement_id')
                ->constrained()
                ->cascadeOnDelete();



            $table->string('name')->nullable();


            $table->string('aadhaar')->nullable();


            $table->string('parent_type')->nullable();


            $table->string('parent_name')->nullable();


            $table->integer('age')->nullable();


            $table->string('pan')->nullable();


            $table->text('residing')->nullable();



            $table->timestamps();


            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('joint_allottees');
    }
};
