<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'spa_id',
        'user_id',
        'name',
        'surname',
        'gender',
        'email',
        'telephone',
        'specialty',
        'timetable_colour',
        'is_active'


    ];

    public function employeeBlocks()
    {
        return $this->hasMany(EmployeeBlock::class, 'employee_id');
    }
    public function employeeSchedules()
    {
        return $this->hasMany(EmployeeSchedule::class, 'employee_id');
    }

    public function spa()
    {
        return $this->belongsTo(Spa::class, 'spa_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'employee_service');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'employee_id');
    }
}
