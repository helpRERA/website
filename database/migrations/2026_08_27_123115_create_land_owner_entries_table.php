<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('land_owner_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('agreement_id')->constrained()->onDelete('cascade');
            $table->string('survey_nos')->nullable();
            $table->string('resurvey_nos')->nullable();
            $table->string('admeasuring')->nullable();
            $table->string('situated_at')->nullable();
            $table->string('tehsil')->nullable();
            $table->string('district')->nullable();
            $table->date('title_deed_date')->nullable();
            $table->string('title_deed_regno')->nullable();
            $table->string('deed_type')->nullable();
            $table->string('deed_sub_registrar_office')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('land_owner_entries');
    }
};