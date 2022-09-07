<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGeneralQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('general_questions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->string('marital_status');
            $table->bigInteger('number_of_family_members');
            $table->string('educational_level');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('annual_income');
            $table->string('net_worth');
            $table->boolean('question1');
            $table->boolean('question2');
            $table->boolean('question3');
            $table->boolean('question4');
            $table->boolean('question5');
            $table->boolean('question6');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('general_questions');
    }
}
