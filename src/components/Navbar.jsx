import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CATEGORY_LIST, PRODUCT_LIST } from '../../constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset search when route changes
  useEffect(() => {
    setSearchQuery('');
    setShowSearchResults(false);
  }, [location.pathname]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const results = PRODUCT_LIST.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.categories.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 results
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleSearchItemClick = (product) => {
    const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    navigate(`/products/${product.id}/${slug}`);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
    setShowProductsDropdown(false);
    setIsOpen(false);
  };

  const navItems = [
    { name: 'HOME', path: '/' },
    { 
      name: 'PRODUCTS', 
      path: '/products',
      hasDropdown: true 
    },
    { name: 'CONTACT US', path: '/contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Left side - Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <div className="relative">
                    <button
                      className={`px-4 py-2 text-sm font-medium tracking-wider transition-all duration-300 relative group ${
                        location.pathname === item.path ? 'text-green-800' : 'text-gray-700 hover:text-green-800'
                      }`}
                    >
                      {item.name}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-green-800 transition-all duration-300 ${
                        location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div 
                      className="absolute top-full left-0 mt-1 py-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    >
                      <Link
                        to="/products"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-800"
                        onClick={() => setShowProductsDropdown(false)}
                      >
                        ALL PRODUCTS
                      </Link>
                      <div className="h-px bg-gray-100 my-1"></div>
                      {CATEGORY_LIST.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryClick(category)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-800"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-4 py-2 text-sm font-medium tracking-wider transition-all duration-300 relative group ${
                      location.pathname === item.path ? 'text-green-800' : 'text-gray-700 hover:text-green-800'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-green-800 transition-all duration-300 ${
                      location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Center - Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center transform hover:scale-105 transition-transform duration-300">
            <img
              className="h-12 w-auto"
              src="/eco-logo.png"
              alt="Eco Logo"
            />
          </Link>

          {/* Right side - Search (hidden on mobile) */}
          <div className="hidden md:flex flex-1 justify-end md:w-64 md:max-w-xs">
            <div className={`relative w-full transition-all duration-300 ${
              searchFocused ? 'scale-102' : ''
            }`}>
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => {
                    setSearchFocused(false);
                    // Delay hiding results to allow for clicking
                    setTimeout(() => setShowSearchResults(false), 200);
                  }}
                  placeholder="Search products..."
                  className={`w-full pl-10 pr-4 py-2.5 rounded-full transition-all duration-300
                    ${searchFocused 
                      ? 'bg-gray-50 shadow-md' 
                      : 'bg-gray-50/50'
                    }
                    focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-800/20`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg 
                    className={`h-5 w-5 transition-colors duration-300 ${
                      searchFocused ? 'text-green-800' : 'text-gray-400'
                    }`} 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 py-2 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSearchItemClick(product)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-150"
                      >
                        <div className="flex items-center space-x-3">
                          <img 
                            src={`/${product.img_url}`} 
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500">{product.categories}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {showSearchResults && searchQuery && searchResults.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 py-3 px-4 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                    <p className="text-sm text-gray-500">No products found</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group relative w-10 h-10 flex justify-center items-center"
              aria-label="Menu"
            >
              <div className="relative flex overflow-hidden items-center justify-center w-[30px] h-[20px]">
                <div className={`flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden ${isOpen ? 'translate-x-2' : ''}`}>
                  <div className={`bg-gray-700 h-[2px] w-7 transform transition-all duration-300 origin-left ${isOpen ? 'rotate-[42deg] translate-y-[2px] w-4 bg-green-800' : ''}`}></div>
                  <div className={`bg-gray-700 h-[2px] w-7 rounded transform transition-all duration-300 ${isOpen ? 'translate-x-10' : ''}`}></div>
                  <div className={`bg-gray-700 h-[2px] w-7 transform transition-all duration-300 origin-left ${isOpen ? '-rotate-[42deg] -translate-y-[2px] w-4 bg-green-800' : ''}`}></div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`transform transition-all duration-300 ease-in-out ${
            isOpen 
              ? 'translate-y-0 opacity-100 visible' 
              : '-translate-y-10 opacity-0 invisible'
          } md:hidden absolute left-0 right-0 bg-white border-b border-gray-100 shadow-lg`}
        >
          <div className="px-4 py-3 space-y-2">
            {/* Mobile Search */}
            <div className="py-4 border-b border-gray-100">
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border-2 border-gray-100 focus:border-green-800 focus:bg-white transition-all duration-300 focus:outline-none"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg 
                    className="h-5 w-5 text-gray-400" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Mobile Search Results */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="mt-2 py-2 bg-white rounded-lg border border-gray-100">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSearchItemClick(product)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="flex items-center space-x-3">
                        <img 
                          src={`/${product.img_url}`} 
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.categories}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {showSearchResults && searchQuery && searchResults.length === 0 && (
                <div className="mt-2 py-3 px-4 bg-white rounded-lg border border-gray-100">
                  <p className="text-sm text-gray-500">No products found</p>
                </div>
              )}
            </div>

            {/* Mobile Navigation Links */}
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.path}
                  className={`block px-4 py-3 text-sm font-medium tracking-wider hover:bg-gray-50 border-l-4 transition-all duration-300 ${
                    location.pathname === item.path 
                      ? 'text-green-800 border-green-800 bg-gray-50'
                      : 'text-gray-700 border-transparent hover:text-green-800 hover:border-green-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
                {item.hasDropdown && (
                  <div className="pl-8 py-2 space-y-1 bg-gray-50">
                    <Link
                      to="/products"
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-green-800"
                      onClick={() => setIsOpen(false)}
                    >
                      ALL PRODUCTS
                    </Link>
                    {CATEGORY_LIST.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-green-800"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 