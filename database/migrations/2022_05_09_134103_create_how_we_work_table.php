<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHowWeWorkTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('how_we_work', function (Blueprint $table) {
            $table->id();
            $table->string('icon');
            $table->string('bg');
            $table->string('title_ar');
            $table->string('title_en');
            $table->string('description_en');
            $table->string('description_ar');
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
        Schema::dropIfExists('how_we_work');
    }
}
