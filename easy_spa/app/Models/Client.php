<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable=[
        'user_id',
        'name',
        'surname',
        'telephone',
        'email',

    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function reservations()
{
    return $this->hasMany(Reservation::class, 'client_id', 'id');
}
}
