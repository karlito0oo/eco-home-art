import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

// Temporary categories until we get the data from the PDF
const categories = [
  'All',
  'Living Room',
  'Dining Room',
  'Bedroom',
  'Outdoor',
  'Lighting',
  'Accessories'
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // This will be replaced with actual data fetching from your backend
    const fetchProducts = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // This is temporary data. Replace with actual data from your backend
        const data = [
          {
            id: 1,
            title: 'Library Stool',
            price: 12500,
            category: 'Living Room',
            isNew: true,
            image: 'https://placehold.co/600x600/e2e8f0/94a3b8?text=Library+Stool'
          },
          // Add more products here
        ];
        
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  return (
    <div className="min-h-screen bg-white py-12" style={{paddingTop: "120px"}}>
      <div className="container mx-auto px-4">
        {/* Updated header section */}
        <div className="mb-16 text-center">
          <h1 className="relative mx-auto inline-block text-4xl font-bold tracking-wider text-gray-900 md:text-5xl">
            OUR PRODUCTS
            <div className="absolute -bottom-4 left-0 right-0 mx-auto h-1 w-32 bg-teal-600"></div>
          </h1>
        </div>

        {/* Category Filter */}
        <div className="mb-12 overflow-x-auto">
          <div className="flex min-w-max gap-2 md:justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
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