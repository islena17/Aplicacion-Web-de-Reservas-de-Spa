<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Spa extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'address',
        'city',
        'postal_code',
        'phone',
        'email',
        'opening_time',
        'closing_time',
        'logo',
        'is_active',
        'slug',
    ];

    public function serviceCategories()
    {
        return $this->hasMany(ServiceCategory::class, 'spa_id');
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function services()
    {
        return $this->hasMany(Service::class, 'spa_id');
    }

    public function employees()
    {
        return $this->hasMany(Employee::class, 'spa_id');
    }

    public function spaSchedules()
    {
        return $this->hasMany(SpaSchedule::class, 'spa_id');
    }
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'spa_id');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
