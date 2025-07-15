import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const products = [
  {
    id: 1,
    title: 'Library Stool',
    price: 12500,
    oldPrice: 15000,
    isNew: true,
    image: 'https://placehold.co/600x600/e2e8f0/94a3b8?text=Library+Stool'
  },
  {
    id: 2,
    title: 'Library Stool Chair',
    price: 12500,
    isSale: true,
    image: 'https://placehold.co/600x600/fce7f3/db2777?text=Library+Stool+Chair'
  },
  {
    id: 3,
    title: 'Library Stool Chair',
    price: 12500,
    image: 'https://placehold.co/600x600/f0fdf4/16a34a?text=Library+Stool+Chair'
  },
  {
    id: 4,
    title: 'Eco Lounge Chair',
    price: 17500,
    isNew: true,
    image: 'https://placehold.co/600x600/eff6ff/2563eb?text=Eco+Lounge+Chair'
  },
  {
    id: 5,
    title: 'Bamboo Side Table',
    price: 7500,
    isSale: true,
    oldPrice: 10000,
    image: 'https://placehold.co/600x600/fdf4ff/a21caf?text=Bamboo+Side+Table'
  }
];

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
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-block rounded-full bg-teal-600 px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-teal-700 hover:shadow-lg"
          >
            Browse More Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 