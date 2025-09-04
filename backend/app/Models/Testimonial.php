<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'content',
        'img_url',
        'is_active',
        'display_order'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    protected $appends = ['full_img_url'];

    // Accessor for full URL
    public function getFullImgUrlAttribute()
    {
        return $this->attributes['img_url'] 
            ? url('storage/'.$this->attributes['img_url']) 
            : null;
    }
}
