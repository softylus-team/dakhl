<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePropertyAmenityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('property_amenity')) {
            Schema::create(
                'property_amenity',
                function (Blueprint $table) {
                $table->bigInteger("property_id")->unsigned();
                $table->bigIncrements('id');
                $table->string("amenity_name");
                $table->string("amenity_type");
                $table->string("amenity_description");
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
        Schema::dropIfExists('property_amenity');
    }
}
