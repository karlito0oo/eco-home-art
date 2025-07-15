import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { PRODUCT_LIST } from '../../constants';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductDetails = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  
  // Find product by ID
  const product = PRODUCT_LIST.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (!product) {
      navigate('/products');
      return;
    }

    // Update URL if slug doesn't match product name
    const correctSlug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (slug !== correctSlug) {
      navigate(`/products/${id}/${correctSlug}`, { replace: true });
    }
  }, [id, slug, product, navigate]);

  const handleInquiry = () => {
    navigate(`/contact?product=${encodeURIComponent(product.name)}`);
  };

  // Get all products in the same category (excluding current product)
  const similarProducts = PRODUCT_LIST.filter(
    p => p.categories === product?.categories && p.id !== product?.id
  );

  const handleCategoryClick = (category) => {
    // Navigate to products page and set the selected category
    navigate('/products', { state: { selectedCategory: category } });
  };

  if (!product) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8" style={{paddingTop: "120px"}}>
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm md:text-base mb-8 flex-wrap uppercase">
        <button 
          onClick={() => navigate('/products')}
          className="text-green-800 hover:text-green-700 font-medium"
        >
          PRODUCTS
        </button>
        <span className="text-gray-500">/</span>
        <button 
          onClick={() => handleCategoryClick(product.categories)}
          className="text-green-800 hover:text-green-700 font-medium"
        >
          {product.categories}
        </button>
        <span className="text-gray-500">/</span>
        <span className="text-gray-600 truncate">{product.name}</span>
      </nav>

      {/* Product Header */}
      <h1 className="text-3xl md:text-4xl text-center font-semibold mb-8">
        PRODUCT DETAIL
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            navigation
            pagination={{ clickable: true }}
            className="w-full rounded-lg overflow-hidden"
          >
            <SwiperSlide>
              <img
                src={`/public/${product.img_url}`}
                alt={product.name}
                className="w-full h-[400px] object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">{product.name}</h2>
          <div className="text-xl font-medium text-gray-600">{product.categories}</div>
          
          <div className="space-y-4">
            <div className="prose max-w-none">
              <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
            </div>
            
            {product.dimensions && (
              <div className="space-y-2">
                <h3 className="font-semibold text-xl">Dimensions:</h3>
                <p className="text-gray-600">{product.dimensions}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleInquiry}
            className="w-full bg-green-800 text-white px-6 py-3 rounded hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            <span>Inquire about this product</span>
          </button>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8">MORE {product.categories}</h3>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 }
            }}
            className="similar-products-swiper"
          >
            {similarProducts.map((item) => (
              <SwiperSlide key={item.id}>
                <div 
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => {
                    const itemSlug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    navigate(`/products/${item.id}/${itemSlug}`);
                  }}
                >
                  <img
                    src={`/public/${item.img_url}`}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-2">{item.name}</h4>
                    <p className="text-green-800 font-medium">{item.categories}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ProductDetails; 