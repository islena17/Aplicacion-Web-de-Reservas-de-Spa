<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeBlock extends Model
{
    protected $fillable = [
        'employee_id',
        'date',
        'start_time',
        'end_time',
        'reason',
        'is_available'

    ];

    public function employee(){
        return $this->belongsTo(Employee::class, 'employee_id');
    }
}
