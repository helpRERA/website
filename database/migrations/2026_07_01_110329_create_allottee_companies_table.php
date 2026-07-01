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
      Schema::create('allottee_companies', function(Blueprint $table){
        $table->id();
        $table->foreignId('agreement_id')
            ->constrained()
            ->cascadeOnDelete();

        $table->string('name')->nullable();
        $table->string('cin')->nullable();
        $table->string('pan')->nullable();
        $table->text('registered_office')->nullable();
        $table->string('authorized_signatory')->nullable();
        $table->string('signatory_aadhaar')->nullable();
        $table->string('board_resolution_date')->nullable();

        $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('allottee_companies');
    }
};
