<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'movieId',
        'movieTitle',
        'moviePost',
        'movieRunTime'
    ];

    public function users() {
        return $this->belongsToMany(User::class);
    }
}
