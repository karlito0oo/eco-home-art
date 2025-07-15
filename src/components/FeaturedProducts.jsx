import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ProductCard from './ProductCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const products = [
  {
    id: 1,
    title: 'Library Stool',
    price: 250,
    oldPrice: 300,
    isNew: true,
    image: 'https://placehold.co/600x600/e2e8f0/94a3b8?text=Library+Stool'
  },
  {
    id: 2,
    title: 'Library Stool Chair',
    price: 250,
    isSale: true,
    image: 'https://placehold.co/600x600/fce7f3/db2777?text=Library+Stool+Chair'
  },
  {
    id: 3,
    title: 'Library Stool Chair',
    price: 250,
    image: 'https://placehold.co/600x600/f0fdf4/16a34a?text=Library+Stool+Chair'
  },
  {
    id: 4,
    title: 'Eco Lounge Chair',
    price: 350,
    isNew: true,
    image: 'https://placehold.co/600x600/eff6ff/2563eb?text=Eco+Lounge+Chair'
  },
  {
    id: 5,
    title: 'Bamboo Side Table',
    price: 150,
    isSale: true,
    oldPrice: 200,
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
            // Mobile
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // Tablet
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            // Desktop
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
      </div>
    </section>
  );
};

export default FeaturedProducts; 