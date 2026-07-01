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
        Schema::create('agreements', function (Blueprint $table) {

            $table->id();


            // Execution
            $table->string('execution_place')->nullable();
            $table->string('date_day')->nullable();
            $table->string('date_month')->nullable();
            $table->string('date_year')->nullable();


            // Types
            $table->enum('promoter_type',
            ['company','partnership','individual'])->nullable();


            $table->enum('allottee_type',
            ['individual','company','partnership','huf'])->nullable();


            // Land

            $table->text('land_survey_nos')->nullable();

            $table->string('land_admeasuring')->nullable();

            $table->string('land_situated_at')->nullable();

            $table->string('land_tehsil_district')->nullable();


            $table->enum('land_ownership_type',
            ['owner','developer'])->nullable();



            // Project

            $table->enum('project_type',
            ['apartment','plotted'])->nullable();


            $table->string('project_name')->nullable();

            $table->string('project_building_type')->nullable();

            $table->text('project_comprising')->nullable();

            $table->text('project_other_components')->nullable();

            $table->text('plot_other_components')->nullable();



            // Approval

            $table->string('commencement_authority')->nullable();

            $table->string('commencement_no')->nullable();

            $table->string('commencement_date')->nullable();

            $table->string('layout_authority')->nullable();



            // RERA

            $table->string('rera_reg_no')->nullable();

            $table->string('rera_reg_date')->nullable();



            // Unit

            $table->string('unit_no')->nullable();

            $table->string('unit_floor')->nullable();

            $table->string('unit_tower')->nullable();

            $table->string('unit_carpet_area')->nullable();


            $table->string('plot_no')->nullable();

            $table->string('plot_area')->nullable();



            // Pricing

            $table->decimal('rate_per_sqft',12,2)->nullable();

            $table->decimal('total_price',12,2)->nullable();

            $table->text('total_price_words')->nullable();



            // Terms

            $table->string('early_payment_rebate')->nullable();

            $table->string('delay_interest_rate')->nullable();

            $table->string('possession_target_month')->nullable();

            $table->integer('grace_period_days')->nullable();



            // Acts

            $table->text('relevant_state_act')->nullable();

            $table->text('apartment_ownership_act')->nullable();



            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agreements');
    }
};
