import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductDetails = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  // Temporary product data - this would come from your API/database
  const product = {
    id: 'LD04',
    name: 'LD04 LOUNGE CHAIR',
    price: 200,
    description: 'Expertly rendered by Carl Hansen & Sen, the lounge chair—first introduced in 1951 and enduring ever since—is available in oak or as a combination of oak and walnut, sourced from sustainable forestry. Choose from seat and back upholstery in a selection of leather options or in a custom fabric.',
    size: {
      width: '75 cm',
      height: '80 cm',
      depth: '85 cm'
    },
    images: [
      '/hero1.png',  // Using placeholder images for now
      '/hero2.png',
      '/hero3.png'
    ],
    similarProducts: [
      {
        id: 1,
        name: 'Modern Chair',
        image: '/hero1.png',
        price: 180
      },
      {
        id: 2,
        name: 'Wing Chair',
        image: '/hero2.png',
        price: 220
      },
      {
        id: 3,
        name: 'Dining Chair',
        image: '/hero3.png',
        price: 150
      },
      {
        id: 4,
        name: 'Lounge Chair',
        image: '/hero1.png',
        price: 250
      }
    ]
  };

  useEffect(() => {
    // Update URL if slug doesn't match product name
    const correctSlug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (slug !== correctSlug) {
      navigate(`/products/${id}/${correctSlug}`, { replace: true });
    }
  }, [id, slug, product.name, navigate]);

  const handleInquiry = () => {
    // Handle inquiry logic here
    console.log('Inquiry about:', product.name);
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-[400px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">{product.name}</h2>
          <p className="text-3xl font-semibold">₱{product.price}</p>
          
          <div className="space-y-4">
            <p className="text-gray-600">{product.description}</p>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-xl">Product Size:</h3>
              <ul className="text-gray-600">
                <li>Width: {product.size.width}</li>
                <li>Height: {product.size.height}</li>
                <li>Depth: {product.size.depth}</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleInquiry}
            className="w-full bg-teal-600 text-white px-6 py-3 rounded hover:bg-teal-700 transition-colors flex items-center justify-center"
          >
            <span>Inquire about this product</span>
          </button>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold mb-8">SIMILAR PRODUCTS</h3>
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
          {product.similarProducts.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-lg mb-2">{item.name}</h4>
                  <p className="text-teal-600 font-bold">₱{item.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductDetails; 