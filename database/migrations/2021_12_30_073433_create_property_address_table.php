<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePropertyAddressTable extends Migration
{
    /**
     * Run the migrations.
     * 
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('property_address')) {
            Schema::create(
                'property_address',
                function (Blueprint $table) {
                $table->bigInteger("property_id")->unsigned()->unique();
                $table->bigIncrements('id');
                $table->string("country", 255);
                $table->string("state", 255);
                $table->string("city",255);
                $table->string("street_name", 255);
                $table->integer("zip_code")->unsigned();
                $table->double("longitude")->unsigned();
                $table->double("latitude")->unsigned();
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
        Schema::dropIfExists('property_address');
    }
}
