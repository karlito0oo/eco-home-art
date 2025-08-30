import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { PRODUCT_LIST } from "../../constants";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductDetails = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();

  // Find product by ID
  const product = PRODUCT_LIST.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (!product) {
      navigate("/products");
      return;
    }

    // Update URL if slug doesn't match product name
    const correctSlug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    if (slug !== correctSlug) {
      navigate(`/products/${id}/${correctSlug}`, { replace: true });
    }
  }, [id, slug, product, navigate]);

  const handleInquiry = () => {
    navigate(`/contact?product=${encodeURIComponent(product.name)}`);
  };

  // Get all products in the same category (excluding current product)
  const similarProducts = PRODUCT_LIST.filter(
    (p) => p.categories === product?.categories && p.id !== product?.id
  );

  const handleCategoryClick = (category) => {
    // Navigate to products page with category as URL parameter
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  if (!product) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm md:text-base mb-8 flex-wrap uppercase">
        <button
          onClick={() => navigate("/products")}
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
      <div className="flex flex-col md:flex-row gap-12 items-start bg-white rounded-2xl shadow-xl p-8 mb-12 animate-fade-in">
        {/* Product Images */}
        <div className="w-full md:w-1/2 relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            navigation
            pagination={{ clickable: true }}
            className="w-full rounded-xl overflow-hidden shadow-lg"
          >
            <SwiperSlide>
              <div className="aspect-square w-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <img
                  src={`/${product.img_url}`}
                  alt={product.name}
                  className="w-4/5 h-4/5 object-contain rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-6 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-4xl font-extrabold text-green-900 mb-2">
              {product.name}
            </h2>
            <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold text-base mb-4 shadow">
              {product.categories}
            </div>
            <div className="prose max-w-none text-lg text-gray-700 mb-6">
              <p className="whitespace-pre-line">{product.description}</p>
            </div>
            {product.dimensions && (
              <div className="space-y-2">
                <h3 className="font-semibold text-xl text-green-800">
                  Dimensions:
                </h3>
                <p className="text-gray-600">{product.dimensions}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleInquiry}
            className="w-full bg-gradient-to-r from-green-700 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-green-800 hover:to-blue-700 transition-colors flex items-center justify-center font-bold text-lg shadow-lg mt-6"
          >
            <span>Inquire about this product</span>
          </button>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-20">
          <h3 className="text-2xl font-extrabold mb-8 text-green-900 tracking-wide">
            More {product.categories}
          </h3>
          <div className="px-2 py-4">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{
                clickable: true,
                el: ".similar-products-pagination",
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="similar-products-swiper !pb-12"
            >
              {similarProducts.map((item) => (
                <SwiperSlide key={item.id}>
                  <div
                    className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg overflow-hidden cursor-pointer h-[400px] flex flex-col transition-transform duration-300 hover:scale-105"
                    onClick={() => {
                      const itemSlug = item.name
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "");
                      navigate(`/products/${item.id}/${itemSlug}`);
                    }}
                  >
                    <div className="h-[250px] w-full flex items-center justify-center bg-white">
                      <img
                        src={`/${item.img_url}`}
                        alt={item.name}
                        className="w-4/5 h-4/5 object-cover rounded-xl shadow"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h4 className="font-semibold text-lg line-clamp-2 text-green-900">
                        {item.name}
                      </h4>
                      <p className="text-green-700 font-medium">
                        {item.categories}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="similar-products-pagination flex justify-center mt-6" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
