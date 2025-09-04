<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model {
    use HasFactory;
    protected $fillable = [
        'name', 'categories', 'dimensions', 'description', 'img_url', 'is_featured'
    ];
    
    // This ensures it's always included in JSON
    protected $appends = ['full_img_url'];

    // Accessor for full URL
    public function getFullImgUrlAttribute()
    {
        return $this->attributes['img_url'] 
            ? url($this->attributes['img_url']) 
            : null;
    }
}
