<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePropertyConstructionReportTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('property_construction_report')) {
            Schema::create(
                'property_construction_report',
                function (Blueprint $table) {
                $table->bigInteger("property_id")->unsigned();
                $table->bigIncrements('id');
                $table->integer("progress_percentage")->unsigned();
                $table->string("description");
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
        Schema::dropIfExists('property_construction_report');
    }
}
