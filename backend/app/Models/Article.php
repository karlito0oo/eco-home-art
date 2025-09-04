<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'content',
        'img_url',
        'is_active'
    ];
    protected $appends = ['full_img_url'];

    // Accessor for full URL
    public function getFullImgUrlAttribute()
    {
        return $this->attributes['img_url'] 
            ? url('storage/'.$this->attributes['img_url']) 
            : null;
    }

    protected $casts = [
        'is_active' => 'boolean'
    ];
}
