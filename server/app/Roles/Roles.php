<?php

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

// Create roles
$adminRole = Role::create(['name' => 'admin']);

// Create permissions
$viewEventsPermission = Permission::create(['name' => 'view events']);
$createEventsPermission = Permission::create(['name' => 'create events']);
$storeEventsPermission = Permission::create(['name' => 'store events']);
$editEventsPermission = Permission::create(['name' => 'edit events']);
$deleteEventsPermission = Permission::create(['name' => 'delete events']);

// Assign permissions to roles
$adminRole->givePermissionTo([$viewEventsPermission, $storeEventsPermission,$createEventsPermission, $editEventsPermission, $deleteEventsPermission]);
