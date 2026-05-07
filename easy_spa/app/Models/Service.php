<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{

    protected $fillable = [
        'service_category_id',
        'spa_id',
        'name',
        'slug',
        'description',
        'image',
        'length_minutes',
        'price',
        'capacity',
        'requires_employee',
        'is_active',
        'order'
    ];

    protected $appends = ['image_url'];
    public function spa()
    {
        return $this->belongsTo(Spa::class, 'spa_id');
    }

    public function employees()
    {
        return $this->belongsToMany(Employee::class, 'employee_service');
    }

    public function category()
    {
        return $this->belongsTo(ServiceCategory::class, 'service_category_id');
    }
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'service_id');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function getImageUrlAttribute()
    {
        return $this->image
            ? asset('storage/' . $this->image)
            : null;
    }
}
