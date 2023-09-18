<?php

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

// Create roles
$adminRole = Role::create(['name' => 'admin']);

// Create permissions
$viewEventsPermission = Permission::get(['name' => 'view events']);
$createEventsPermission = Permission::create(['name' => 'create events']);
$storeEventsPermission = Permission::store(['name' => 'store events']);
$editEventsPermission = Permission::update(['name' => 'edit events']);
$deleteEventsPermission = Permission::destroy(['name' => 'delete events']);

// Assign permissions to roles
$adminRole->givePermissionTo([$viewEventsPermission, $storeEventsPermission,$createEventsPermission, $editEventsPermission, $deleteEventsPermission]);
