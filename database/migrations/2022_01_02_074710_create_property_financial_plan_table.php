<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePropertyFinancialPlanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('property_financial_plan')) {
            Schema::create(
                'property_financial_plan',
                function (Blueprint $table) {
                $table->bigInteger("property_id")->unsigned()->unique();
                $table->bigIncrements('id');
                $table->integer("price")->unsigned();
                $table->integer("minimum_investment")->unsigned();
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
        Schema::dropIfExists('property_financial_plan');
    }
}
