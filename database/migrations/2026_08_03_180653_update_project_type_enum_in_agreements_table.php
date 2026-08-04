<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("ALTER TABLE agreements MODIFY COLUMN project_type ENUM('commercial', 'residential', 'plotted', 'other') NULL");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE agreements MODIFY COLUMN project_type ENUM('apartment', 'plotted') NULL");
    }
};