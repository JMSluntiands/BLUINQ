<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'username')) {
                $table->string('username')->nullable()->unique()->after('id');
            }
            if (! Schema::hasColumn('users', 'fullname')) {
                $table->string('fullname')->nullable()->after('username');
            }
            if (! Schema::hasColumn('users', 'image')) {
                $table->string('image')->nullable()->after('fullname');
            }
            if (! Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('user')->after('image');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $columns = array_filter(
                ['username', 'fullname', 'image', 'role'],
                fn (string $col) => Schema::hasColumn('users', $col)
            );
            if ($columns !== []) {
                $table->dropColumn($columns);
            }
        });
    }
};
