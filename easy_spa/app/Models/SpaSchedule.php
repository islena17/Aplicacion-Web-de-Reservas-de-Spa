<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpaSchedule extends Model
{
    protected $fillable = [
        'spa_id',
        'day_of_week',
        'start_time',
        'end_time',
        'is_working'

    ];

    public function spa(){
        return $this->belongsTo(Spa::class, 'spa_id');
    }
}
