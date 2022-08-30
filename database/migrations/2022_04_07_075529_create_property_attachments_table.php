<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePropertyAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            if (!Schema::hasTable('property_attachments')) {
                Schema::create(
                    'property_attachments',
                    function (Blueprint $table) {
                    $table->bigInteger("property_id")->unsigned();
                    $table->bigIncrements('id');
                    $table->string("attach_name");
                    $table->string("attach_path");
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
        Schema::dropIfExists('property_attachments');
    }
}
