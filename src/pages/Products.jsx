import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import api from "../services/api";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);

  // Fetch categories and initialize state based on URL
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        const allCategories = [{ id: "ALL", name: "ALL" }, ...(response || [])];
        setCategories(allCategories);

        // Handle initial category from URL
        const categoryParam = searchParams.get("category");
        if (categoryParam) {
          const matchedCategory = response.data.find(
            (cat) => cat.name.toUpperCase() === categoryParam.toUpperCase()
          );
          if (matchedCategory) {
            setSelectedCategory(matchedCategory.id);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Update selected category when URL changes
  useEffect(() => {
    console.log("Categories:", categories);
    const categoryParam = searchParams.get("category");
    if (!categoryParam) {
      setSelectedCategory("ALL");
    } else {
      const matchedCategory = categories.find(
        (cat) => cat.name.toUpperCase() === categoryParam.toUpperCase()
      );
      console.log("Matched Category:", matchedCategory);
      if (matchedCategory) {
        setSelectedCategory(matchedCategory.id);
      }
    }
  }, [searchParams, categories]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const categoryId = selectedCategory !== "ALL" ? selectedCategory : "";
        const response = await api.get(
          `/products?category_id=${categoryId}&page=${currentPage}`
        );
        setProducts(response.data || []);
        setTotalPages(response.last_page || 1);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [selectedCategory, currentPage]);

  // Update URL when page changes
  useEffect(() => {
    if (currentPage === 1) {
      searchParams.delete("page");
    } else {
      searchParams.set("page", currentPage.toString());
    }
    setSearchParams(searchParams);
  }, [currentPage]);

  const handleCategoryChange = (categoryId) => {
    setCurrentPage(1); // Reset to first page when changing category
    setSelectedCategory(categoryId);

    // Get category name for URL
    const category = categories.find((cat) => cat.id === categoryId);
    if (categoryId === "ALL") {
      searchParams.delete("category");
    } else if (category) {
      searchParams.set("category", category.name);
    }
    searchParams.delete("page"); // Remove page parameter when changing category
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Updated header section */}
        <div className="mb-16 text-center">
          <h1 className="relative mx-auto inline-block text-4xl font-bold tracking-wider text-gray-900 md:text-5xl">
            OUR PRODUCTS
            <div className="absolute -bottom-4 left-0 right-0 mx-auto h-1 w-32 bg-green-800"></div>
          </h1>
        </div>

        {/* Mobile Breadcrumbs */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-gray-600">Category:</span>
            <button
              onClick={() => handleCategoryChange("ALL")}
              className={`
                inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium
                ${
                  selectedCategory === "ALL"
                    ? "bg-green-800 text-white"
                    : "bg-green-50 text-green-800"
                }
              `}
            >
              {categories.find((cat) => cat.id === selectedCategory)?.name ||
                "ALL"}
              {selectedCategory !== "ALL" && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-800 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
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

        {!loading && products.length === 0 && (
          <div className="flex h-64 items-center justify-center">
            <p className="text-lg text-gray-600">
              No products found in this category.
            </p>
          </div>
        )}

        {/* Pagination */}
        {!loading && products.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
