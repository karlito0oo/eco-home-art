<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model {
    use HasFactory;
    protected $fillable = [
        'name', 'categories', 'dimensions', 'description', 'img_url', 'is_featured'
    ];
}
