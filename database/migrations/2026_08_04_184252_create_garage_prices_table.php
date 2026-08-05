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
        Schema::create('garage_prices', function (Blueprint $table) {

            $table->id()->comment('Primary Key');

            $table->foreignId('agreement_id')
                ->constrained('agreements')
                ->cascadeOnDelete()
                ->comment('Reference to Agreement');

            $table->string('garage_no')
                ->nullable()
                ->comment('Garage / Parking Slot Number');

            $table->decimal('price', 15, 2)
                ->nullable()
                ->comment('Garage / Parking Slot Price');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('garage_prices');
    }
};
