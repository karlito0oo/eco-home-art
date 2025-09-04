import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { PRODUCT_LIST } from "../../constants";
import api from "../services/api";

const ALL_CATEGORY = ["ALL"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [categories, setCategories] = useState([ALL_CATEGORY]);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories([
          ALL_CATEGORY,
          ...(response?.map((data) => data.name) || []),
        ]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Hide category navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 80) {
        setShowCategories(false);
      } else {
        setShowCategories(true);
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Realtime search preview
  useEffect(() => {
    if (search.trim()) {
      const results = PRODUCT_LIST.filter((product) =>
        product.name.toLowerCase().includes(search.trim().toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [search]);

  // Search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setShowDropdown(false);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-300">
      {/* Top Row: Mobile & Desktop */}
      <div
        className={`fixed top-0 left-0 w-full z-[100] bg-white shadow transition-all duration-300${
          menuOpen ? " pointer-events-none opacity-0" : ""
        }`}
        style={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          backdropFilter: "blur(2px)",
        }}
      >
        <div className="flex items-center w-full px-4 md:px-8 py-3">
          {/* Logo Left */}
          <div
            className="flex items-center cursor-pointer md:mr-8"
            onClick={() => navigate("/")}
          >
            <img src="/eco-logo.png" alt="Eco Home Art" className="h-10" />
          </div>
          {/* Desktop Nav - Centered Search */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="relative w-80">
              <form
                className="flex items-center bg-gray-200 rounded w-full px-4 py-2"
                onSubmit={handleSearch}
                autoComplete="off"
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
                  onFocus={() =>
                    searchResults &&
                    searchResults.length > 0 &&
                    setShowDropdown(true)
                  }
                  onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                />
                <button
                  type="submit"
                  className="ml-2 text-gray-600 hover:text-green-700"
                >
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </button>
              </form>
              {/* Search Preview Dropdown - Desktop */}
              {showDropdown && searchResults && searchResults.length > 0 && (
                <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 rounded shadow-lg z-[200] max-h-80 overflow-y-auto animate-fade-in">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={() => {
                        const slug = product.name
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "");
                        navigate(`/products/${product.id}/${slug}`);
                        setShowDropdown(false);
                      }}
                    >
                      <img
                        src={`/${product.img_url}`}
                        alt={product.name}
                        className="h-10 w-10 object-cover rounded"
                      />
                      <span className="font-medium text-gray-800 truncate">
                        {product.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Desktop Nav - Right */}
          <div className="hidden md:flex items-center gap-8 ml-8">
            <button
              onClick={() => navigate("/")}
              className="font-medium text-gray-900 hover:text-green-700 transition flex items-center gap-2"
            >
              HOME
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="font-medium text-gray-900 hover:text-green-700 transition flex items-center gap-2"
            >
              CONTACT US
            </button>
          </div>
          {/* Burger Menu - Mobile */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              className="p-2 rounded focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              <svg
                width="32"
                height="32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Drawer - OUTSIDE NAVBAR */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-black bg-opacity-40 flex justify-end"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="w-4/5 max-w-xs bg-white h-full shadow-lg p-6 flex flex-col gap-6 relative z-[100000]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
              className="font-medium text-gray-900 hover:text-green-700 transition flex items-center gap-2 text-lg"
            >
              HOME
            </button>
            <button
              onClick={() => {
                navigate("/contact");
                setMenuOpen(false);
              }}
              className="font-medium text-gray-900 hover:text-green-700 transition flex items-center gap-2 text-lg"
            >
              CONTACT US
            </button>
            <div className="relative">
              <form
                className="flex items-center bg-gray-200 rounded w-full px-4 py-2"
                onSubmit={(e) => {
                  handleSearch(e);
                  setMenuOpen(false);
                }}
                autoComplete="off"
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
                  onFocus={() =>
                    searchResults &&
                    searchResults.length > 0 &&
                    setShowDropdown(true)
                  }
                  onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                />
                <button
                  type="submit"
                  className="ml-2 text-gray-600 hover:text-green-700"
                >
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </button>
              </form>
              {/* Search Preview Dropdown - Mobile */}
              {showDropdown && searchResults && searchResults.length > 0 && (
                <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 rounded shadow-lg z-[100001] max-h-80 overflow-y-auto animate-fade-in">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={() => {
                        const slug = product.name
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "");
                        navigate(`/products/${product.id}/${slug}`);
                        setShowDropdown(false);
                        setMenuOpen(false);
                      }}
                    >
                      <img
                        src={`/${product.img_url}`}
                        alt={product.name}
                        className="h-10 w-10 object-cover rounded"
                      />
                      <span className="font-medium text-gray-800 truncate">
                        {product.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Spacer for fixed navbar height */}
      <div className="block md:hidden" style={{ height: "68px" }}></div>
      <div className="hidden md:block" style={{ height: "68px" }}></div>
      {/* Bottom Row: Navigation Links (Categories) */}
      <div
        className={`flex flex-wrap justify-center gap-4 md:gap-8 py-3 text-base font-medium tracking-wide uppercase bg-white transition-all duration-500 ease-in-out ${
          showCategories
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-8 pointer-events-none"
        }`}
        style={{ willChange: "opacity, transform" }}
      >
        {categories?.map((link) => (
          <button
            key={link}
            onClick={() => {
              if (link === "ALL") navigate("/products");
              else navigate(`/products?category=${encodeURIComponent(link)}`);
            }}
            className="text-gray-700 hover:text-green-700 transition px-2 py-1 rounded"
          >
            {link}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
