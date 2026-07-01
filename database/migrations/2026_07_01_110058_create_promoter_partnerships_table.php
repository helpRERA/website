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
        Schema::create('promoter_partnerships', function(Blueprint $table){

        $table->id();


        $table->foreignId('agreement_id')
            ->constrained()
            ->cascadeOnDelete();



        $table->string('name')->nullable();


        $table->text('business_place')->nullable();


        $table->string('pan')->nullable();


        $table->string('authorized_partner')->nullable();


        $table->string('partner_aadhaar')->nullable();


        $table->text('authorized_vide')->nullable();


        $table->timestamps();


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promoter_partnerships');
    }
};
