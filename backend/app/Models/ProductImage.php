<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    protected $fillable = ['product_id', 'image_url', 'order'];

    protected $appends = ['full_image_url'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function getFullImageUrlAttribute()
    {
        return $this->attributes['image_url'] 
            ? url('storage/'.$this->attributes['image_url']) 
            : null;
    }
}
