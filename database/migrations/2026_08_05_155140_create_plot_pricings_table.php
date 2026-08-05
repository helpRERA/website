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
         Schema::create('plot_pricings', function (Blueprint $table) {

            $table->id()->comment('Primary Key');

            $table->foreignId('agreement_id')
                ->constrained('agreements')
                ->cascadeOnDelete()
                ->comment('Reference to Agreement');

            $table->string('plot_no_type')
                ->nullable()
                ->comment('Plot Number / Type');

            $table->decimal('rate_per_sqft', 15, 2)
                ->nullable()
                ->comment('Rate per Square Feet');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plot_pricings');
    }
};
