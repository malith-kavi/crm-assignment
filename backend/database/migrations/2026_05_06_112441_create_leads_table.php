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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('lead_name');
            $table->string('company_name');
            $table->string('email');
            $table->string('phone');
            $table->string('lead_source');
            $table->string('assigned_salesperson');
            $table->string('status')->default('New');
            $table->decimal('estimated_deal_value', 10, 2)->default(0);
            $table->string('priority')->default('Medium');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
