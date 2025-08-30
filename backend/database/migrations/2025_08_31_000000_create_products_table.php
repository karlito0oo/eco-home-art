<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('categories')->nullable();
            $table->string('dimensions')->nullable();
            $table->text('description')->nullable();
            $table->string('img_url')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }
    public function down() {
        Schema::dropIfExists('products');
    }
};
