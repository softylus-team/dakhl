<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumForignKeyInvestmentIdToStakesTable extends Migration
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
            $table->foreign('investment_id')->references('id')->on('investments')->onUpdate('cascade')->onDelete('cascade'); 

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
            $table->dropForeign('investment_id');

        });
    }
}
