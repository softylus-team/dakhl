<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBankAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('bank_accounts')) {
            Schema::create('bank_accounts', function (Blueprint $table) {
                $table->id();
                $table->bigInteger('holder_id')->unsigned();
                $table->string('holder_name');
                $table->string('bank_name');
                $table->string('branch_name');
                $table->string('country');
                $table->string('swift_bic_code');
                $table->string('iban');
                $table->bigInteger('account_number');
                $table->boolean('active')->default(1);
                $table->timestamps();
                $table->foreign('holder_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('bank_accounts');
    }
}
