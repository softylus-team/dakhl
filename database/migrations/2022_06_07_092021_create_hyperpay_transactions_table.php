<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHyperpayTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('hyperpay_transactions')) {
            Schema::create('hyperpay_transactions', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->bigInteger('user_id')->unsigned();
                $table->string('checkout_id')->unique();
                $table->string('status');
                $table->float('amount');
                $table->string('currency');
                $table->json('data')->nullable();
                $table->json('trackable_data');
                $table->string('brand');

                $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hyperpay_transactions');
    }
}