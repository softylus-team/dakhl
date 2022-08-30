<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePropertyPhotoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('property_photo')) {
            Schema::create(
                'property_photo',
                function (Blueprint $table) {
                $table->bigInteger("property_id")->unsigned();
                $table->bigIncrements('id');
                $table->string("photo_name");
                $table->string("photo_path");
                $table->foreign('property_id')->references('id')->on('properties')->onDelete('cascade');
                $table->timestamps();
            }
            );
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('property_photo');
    }
}
