<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AddAdminUser extends Migration
{
    public function up()
    {

        $adminRole = Role::create(['name' => 'admin']);

        $adminUser = DB::table('users')->insertGetId([
            'name' => 'Admin',
            'lastname' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('onlyadmin1234'),
            'image' => null,
            'acceptsTerms' => true,
            'wantsInfo' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        
        $user = \App\Models\User::find($adminUser);
        $user->assignRole($adminRole);
    }

    public function down()
    {
        // 
    }
}
