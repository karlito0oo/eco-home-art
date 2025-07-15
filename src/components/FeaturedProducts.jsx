import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { PRODUCT_LIST } from '../../constants';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Get featured products
const featuredProducts = PRODUCT_LIST.filter(product => product.is_featured);

const FeaturedProducts = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          Featured Products
        </h2>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          className="featured-products-swiper !pb-12"
        >
          {featuredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard 
                id={product.id}
                title={product.name}
                image={product.img_url}
                dimensions={product.dimensions}
                description={product.description}
                category={product.categories}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-block rounded-full bg-green-800 px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-green-700 hover:shadow-lg"
          >
            Browse More Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 