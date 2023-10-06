<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'lastname',
        'email',
        'password',
        'preference_id',
        'profile_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    
    public function profile() {
    return $this->belongsTo(Profile::class, 'profile_id');
}

public function preference() {
    return $this->belongsTo(Preference::class, 'preference_id');
}

public static function findMatchesForUser($user)
    {
        return self::whereHas('preference', function ($query) use ($user) {
            $query->where('gender', $user->preference->looksFor)
                ->where('looksFor', $user->preference->gender)
                ->where('ageRange', $user->preference->ageRange);
        })
        ->where('id', '!=', $user->id)
        ->get();
    }

    public function confirmAttendance()
{
    return $this->belongsToMany(Event::class);
}

}
