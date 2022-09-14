<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumForignKeyPropertyIdToStakesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('stakes', function (Blueprint $table) {
            //
            $table->foreign('property_id')->references('id')->on('properties')->onUpdate('cascade')->onDelete('cascade'); 

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('stakes', function (Blueprint $table) {
            //
            $table->dropForeign('property_id');

        });
    }
}
