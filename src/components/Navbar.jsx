import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Left side - Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {['HOME', 'PRODUCTS', 'CONTACT US'].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="px-4 py-2 text-sm font-medium tracking-wider text-gray-700 hover:text-primary transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary group-hover:w-full group-hover:left-0 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Center - Logo */}
          <div className="flex-shrink-0 flex items-center transform hover:scale-105 transition-transform duration-300">
            <img
              className="h-12 w-auto"
              src="/eco-logo.png"
              alt="Eco Logo"
            />
          </div>

          {/* Right side - Search (hidden on mobile) */}
          <div className="hidden md:flex flex-1 justify-end md:w-64 md:max-w-xs">
            <div className={`relative w-full transition-all duration-300 ${
              searchFocused ? 'scale-102' : ''
            }`}>
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`w-full pl-10 pr-4 py-2.5 border-b-2 transition-all duration-300 bg-transparent
                    ${searchFocused 
                      ? 'border-primary' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                    focus:outline-none text-gray-700`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg 
                    className={`h-5 w-5 transition-colors duration-300 ${
                      searchFocused ? 'text-primary' : 'text-gray-400'
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
                  <div className={`bg-gray-700 h-[2px] w-7 transform transition-all duration-300 origin-left ${isOpen ? 'rotate-[42deg] translate-y-[2px] w-4 bg-primary' : ''}`}></div>
                  <div className={`bg-gray-700 h-[2px] w-7 rounded transform transition-all duration-300 ${isOpen ? 'translate-x-10' : ''}`}></div>
                  <div className={`bg-gray-700 h-[2px] w-7 transform transition-all duration-300 origin-left ${isOpen ? '-rotate-[42deg] -translate-y-[2px] w-4 bg-primary' : ''}`}></div>
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
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-100 focus:border-primary focus:bg-white transition-all duration-300 focus:outline-none rounded-md"
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
            </div>

            {/* Mobile Navigation Links */}
            {['HOME', 'PRODUCTS', 'CONTACT US'].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block px-4 py-3 text-sm font-medium tracking-wider text-gray-700 hover:text-primary hover:bg-gray-50 border-l-4 border-transparent hover:border-primary transition-all duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 