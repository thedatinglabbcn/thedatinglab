<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'date',
        'time',
        'title',
        'description',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function confirmAttendance()
{
    return $this->belongsToMany(User::class, 'event_user', 'event_id', 'user_id');
}

}
