<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePropertiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('properties')) {
            Schema::create(
                'properties',
                function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string("name", 255);
                $table->string("type", 255);
                $table->integer("bedrooms")->unsigned();
                $table->string("status", 255);
                $table->string("nighborhood", 255);
                $table->string("bulding_name", 255);
                $table->string("community_name", 255);
                $table->string("description", 255);
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
    public function down()//roll back your most recent set of migrations
    {
        Schema::dropIfExists('properties');
    }
}
