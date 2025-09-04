<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model {
    use HasFactory;
    protected $fillable = [
        'name', 'category_id', 'dimensions', 'description', 'img_url', 'is_featured', 'featured_order'
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

    /**
     * Get the category that owns the product.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class)->orderBy('order');
    }
}
