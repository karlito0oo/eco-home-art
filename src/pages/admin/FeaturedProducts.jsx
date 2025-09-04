import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import api from "../../services/api";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [availableLoading, setAvailableLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableProducts, setAvailableProducts] = useState({
    data: [],
    total: 0,
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  // Fetch featured products
  const fetchFeaturedProducts = async () => {
    try {
      setFeaturedLoading(true);
      const response = await api.get("/products?featured=true&per_page=100");
      const sortedProducts = response.data?.data || response.data || [];
      setProducts(sortedProducts);
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

  // Fetch available products with pagination and search
  useEffect(() => {
    let isActive = true;
    const fetchAvailableProducts = async () => {
      try {
        setAvailableLoading(true);
        const featuredIds = products.map((p) => p.id);
        const response = await api.get(
          `/products?page=${page}&per_page=${perPage}&search=${encodeURIComponent(
            searchTerm
          )}&exclude=${featuredIds.join(",")}`
        );

        if (isActive) {
          setAvailableProducts(response);
          setTotalPages(Math.ceil(response.total / perPage));
        }
      } catch (error) {
        console.error("Error fetching available products:", error);
        if (isActive) {
          alert("Failed to fetch available products. Please try again.");
        }
      } finally {
        if (isActive) {
          setAvailableLoading(false);
        }
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchAvailableProducts();
    }, 300);

    return () => {
      isActive = false;
      clearTimeout(debounceTimer);
    };
  }, [page, searchTerm, products, perPage]);

  // Handle drag and drop reordering
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const newItems = Array.from(products);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = newItems.map((item, index) => ({
      ...item,
      featured_order: index + 1,
    }));

    // Optimistic UI update
    setProducts(updatedItems);

    try {
      await api.post("/products/featured/reorder", {
        products: updatedItems.map((product, index) => ({
          id: product.id,
          featured_order: index + 1,
        })),
      });
    } catch (error) {
      console.error("Error updating product order:", error);
      alert("Failed to reorder products. Please try again.");
      // Rollback by refetching only on failure
      fetchFeaturedProducts();
    }
  };

  // Toggle featured status
  const toggleFeatured = async (product, isFeatured) => {
    try {
      setFeaturedLoading(true);
      const newOrder = isFeatured
        ? products.length > 0
          ? Math.max(...products.map((p) => p.featured_order || 0)) + 1
          : 1
        : null;

      const data = {
        is_featured: isFeatured,
        featured_order: newOrder,
      };

      await api.put(`/products/${product.id}`, data);

      // Refresh both lists
      await fetchFeaturedProducts();
      setPage(1);
    } catch (error) {
      console.error("Error updating product featured status:", error);
      // Show error to user
      alert("Failed to update product status. Please try again.");
    } finally {
      setFeaturedLoading(false);
    }
  };

  const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-800 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Featured Products
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Featured Products List */}
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          {featuredLoading && <LoadingOverlay />}
          <h2 className="text-xl font-semibold mb-4">Currently Featured</h2>
          <p className="text-sm text-gray-600 mb-4">
            Drag and drop to reorder products
          </p>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="featured">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-3"
                >
                  {products.map((product, index) => (
                    <Draggable
                      key={`featured-${product.id.toString()}`}
                      draggableId={`featured-${product.id.toString()}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-500 transition-colors"
                        >
                          <div className="w-16 h-16 flex-shrink-0">
                            <img
                              src={`/${product.img_url}`}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {product.category?.name}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleFeatured(product, false)}
                            className="p-2 text-red-600 hover:text-red-800"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Available Products List */}
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          {availableLoading && <LoadingOverlay />}
          <h2 className="text-xl font-semibold mb-4">Available Products</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {availableProducts.data?.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="w-16 h-16 flex-shrink-0">
                  <img
                    src={`/${product.img_url}`}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {product.category?.name}
                  </p>
                </div>
                <button
                  onClick={() => toggleFeatured(product, true)}
                  className="p-2 text-green-600 hover:text-green-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="flex items-center text-sm text-gray-500">
              Showing {(page - 1) * perPage + 1} to{" "}
              {Math.min(
                page * perPage,
                (page - 1) * perPage + (availableProducts.data?.length || 0)
              )}{" "}
              products
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
