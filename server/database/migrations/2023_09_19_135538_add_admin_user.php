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

        $permissions = [
            'view events',
            'create events',
            'store events',
            'edit events',
            'delete events',
        ];

        foreach ($permissions as $permissionName) {
            Permission::create(['name' => $permissionName]);
        }

    
        $adminRole->givePermissionTo($permissions);

        $adminUser = DB::table('users')->insertGetId([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('onlyadmin1234'),
            'email_verified_at' => null,
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
