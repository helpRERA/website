<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->fullText('title');
            $table->fullText('description');
            $table->string('title_malayalam')->nullable();
            $table->text('description_malayalam')->nullable();
            $table->fullText('title_malayalam')->language('malayalam');
            $table->fullText('description_malayalam')->language('malayalam');
            $table->date('date')->nullable();
            $table->string('type')->nullable();
            $table->string('sub_type')->nullable();
            $table->boolean('published')->default(0);
            $table->boolean('ticker')->default(0);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('announcements');
    }
};
