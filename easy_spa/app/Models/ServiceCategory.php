<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceCategory extends Model
{
    protected $fillable = [
        'spa_id',
        'name',
        'slug',
        'description',
        'is_active',
        'order'
    ];

        public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function spa(){
        return $this->belongsTo(Spa::class, 'spa_id');
    }
}
