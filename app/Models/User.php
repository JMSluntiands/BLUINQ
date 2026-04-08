<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'email',
        'fullname',
        'image',
        'role',
        'archived_at',
        'name',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'password_hash',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'archived_at' => 'datetime',
        ];
    }

    /**
     * Legacy schemas may use `password_hash` instead of (or as well as) Laravel's `password`.
     */
    public function getAuthPassword(): string
    {
        if (! empty($this->attributes['password_hash'] ?? null)) {
            return $this->attributes['password_hash'];
        }

        return $this->attributes['password'] ?? '';
    }

    public function setPasswordAttribute(?string $value): void
    {
        if ($value === null || $value === '') {
            return;
        }

        $hashed = $this->valueLooksHashed($value) ? $value : Hash::make($value);

        if (Schema::hasColumn($this->getTable(), 'password')) {
            $this->attributes['password'] = $hashed;
        }
        if (Schema::hasColumn($this->getTable(), 'password_hash')) {
            $this->attributes['password_hash'] = $hashed;
        }
    }

    private function valueLooksHashed(string $value): bool
    {
        return password_get_info($value)['algoName'] !== 'unknown';
    }
}
