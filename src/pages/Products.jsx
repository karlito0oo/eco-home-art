import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PRODUCT_LIST, CATEGORY_LIST } from '../../constants';

// Add 'ALL' to the categories list
const categories = ['ALL', ...CATEGORY_LIST];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category')?.toUpperCase() || 'ALL');
  const [filteredProducts, setFilteredProducts] = useState(PRODUCT_LIST);
  const [loading, setLoading] = useState(false);

  // Update selected category when URL parameter changes
  useEffect(() => {
    const categoryParam = searchParams.get('category')?.toUpperCase();
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('ALL');
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedCategory === 'ALL') {
      setFilteredProducts(PRODUCT_LIST);
    } else {
      setFilteredProducts(PRODUCT_LIST.filter(product => product.categories === selectedCategory));
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    if (category === 'ALL') {
      // Remove category parameter if 'ALL' is selected
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-white py-12" style={{paddingTop: "120px"}}>
      <div className="container mx-auto px-4">
        {/* Updated header section */}
        <div className="mb-16 text-center">
          <h1 className="relative mx-auto inline-block text-4xl font-bold tracking-wider text-gray-900 md:text-5xl">
            OUR PRODUCTS
            <div className="absolute -bottom-4 left-0 right-0 mx-auto h-1 w-32 bg-green-800"></div>
          </h1>
        </div>

        {/* Mobile Breadcrumbs */}
        <div className="md:hidden mb-8">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-gray-600">Category:</span>
            <button 
              onClick={() => handleCategoryChange('ALL')}
              className={`
                inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium
                ${selectedCategory === 'ALL' 
                  ? 'bg-green-800 text-white'
                  : 'bg-green-50 text-green-800'
                }
              `}
            >
              {selectedCategory}
              {selectedCategory !== 'ALL' && (
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Categories - Hidden on mobile */}
        <div className="hidden md:block mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`
                  px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                  ${selectedCategory === category
                    ? 'bg-green-800 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-green-800'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-800 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                title={product.name}
                image={product.img_url}
                dimensions={product.dimensions}
                description={product.description}
                category={product.categories}
              />
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="flex h-64 items-center justify-center">
            <p className="text-lg text-gray-600">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products; 