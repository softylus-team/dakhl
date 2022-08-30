<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePropertyReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('property_reviews')) {
            Schema::create(
                'property_reviews',
                function (Blueprint $table) {
                $table->bigInteger("property_id")->unsigned();
                $table->bigIncrements('id');
                $table->bigInteger("author_id")->unsigned();
                $table->string("message");
                $table->string("rating");
                $table->foreign('property_id')->references('id')->on('properties')->onDelete('cascade');
                $table->foreign('author_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('property_reviews');
    }
}
