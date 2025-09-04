import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { PRODUCT_LIST } from "../../constants";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import api from "../services/api";
import { useEffect, useState } from "react";

// Get featured products

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  // Fetch featured products
  const fetchFeaturedProducts = async () => {
    try {
      setFeaturedLoading(true);
      const response = await api.get("/products?featured=true&per_page=100");
      const sortedProducts = response.data?.data || response.data || [];
      setFeaturedProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      alert("Failed to fetch featured products. Please try again.");
    } finally {
      setFeaturedLoading(false);
    }
  };

  // Initial fetch of featured products
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-800 border-t-transparent"></div>
    </div>
  );
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          Featured Products
        </h2>

        {featuredLoading ? (
          // 🔄 Show loader while fetching
          <div className="flex justify-center items-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-800 border-t-transparent"></div>
          </div>
        ) : featuredProducts.length === 0 ? (
          // ❌ Show empty state
          <p className="text-center text-gray-600">
            No featured products available.
          </p>
        ) : (
          // ✅ Show carousel when loaded
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
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
        )}

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
