<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeSchedule extends Model
{
    protected $fillable = [
        'employee_id',
        'date',
        'day_of_week',
        'start_time',
        'end_time',
        'is_working'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}
