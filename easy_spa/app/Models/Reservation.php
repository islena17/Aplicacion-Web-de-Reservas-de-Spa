<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
        protected $fillable = [
        'client_id',
        'spa_id',
        'service_id',
        'employee_id',
        'reservation_date',
        'start_time',
        'end_time',
        'status',
        'final_price',
        'observations',
    ];

        public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function spa()
    {
        return $this->belongsTo(Spa::class, 'spa_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

    
}
