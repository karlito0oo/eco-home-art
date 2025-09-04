import { useEffect, useState } from "react";
import api from "../services/api";
import Table from "../components/Table";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // ✅ debounce state
  const [editProduct, setEditProduct] = useState(null);

  // ✅ Debounce search input (500ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchProducts = () => {
    setLoading(true);
    api
      .get(
        `/products?page=${page}&search=${encodeURIComponent(debouncedSearch)}`
      )
      .then((res) => {
        const arr = Array.isArray(res.data?.data)
          ? res.data.data
          : res.data || [];
        setProducts(arr);
        setTotalPages(res.last_page || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // ✅ Fetch when page or debouncedSearch changes
  useEffect(() => {
    fetchProducts();
  }, [page, debouncedSearch]);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await api.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product List</h1>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search products..."
            className="px-3 py-2 border rounded"
            style={{ minWidth: 200 }}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded shadow"
            onClick={() => {
              setEditProduct(null); // reset form for new product
              setShowModal(true);
            }}
          >
            Add Product
          </button>
        </div>
      </div>

      <Table
        columns={[
          { key: "name", label: "Name" },
          {
            key: "category",
            label: "Category",
            render: (_, product) => product.category?.name || "-",
          },
          { key: "dimensions", label: "Dimensions" },
          { key: "description", label: "Description" },
          {
            key: "img_url",
            label: "Image",
            render: (_, product) => (
              <img
                src={product.full_img_url}
                alt={product.name}
                className="h-12 w-12 object-cover rounded"
              />
            ),
          },
        ]}
        data={products}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 rounded bg-gray-200"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 rounded bg-gray-200"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded shadow-lg p-8 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {editProduct ? "Edit Product" : "Add Product"}
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                // Log form data for debugging
                console.log("Form Data Contents:");
                for (let pair of formData.entries()) {
                  console.log(pair[0], pair[1]);
                }

                try {
                  if (editProduct) {
                    // For update, we need to explicitly set _method to PUT for Laravel
                    formData.append("_method", "PUT");
                    const response = await api.post(
                      `/products/${editProduct.id}`,
                      formData
                    );
                    console.log("Update response:", response);
                  } else {
                    const response = await api.post("/products", formData);
                    console.log("Create response:", response);
                  }
                } catch (error) {
                  console.error("Error saving product:", error);
                  alert(
                    "Error saving product: " +
                      (error.message || "Unknown error")
                  );
                  return;
                }

                setShowModal(false);
                setEditProduct(null);
                setPage(1);
                fetchProducts();
              }}
            >
              <input
                name="name"
                placeholder="Name"
                className="w-full mb-2 px-3 py-2 border rounded"
                required
                defaultValue={editProduct?.name || ""}
              />
              <select
                name="category_id"
                className="w-full mb-2 px-3 py-2 border rounded"
                defaultValue={editProduct?.category_id || ""}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                name="dimensions"
                placeholder="Dimensions"
                className="w-full mb-2 px-3 py-2 border rounded"
                defaultValue={editProduct?.dimensions || ""}
              />
              <textarea
                name="description"
                placeholder="Description"
                className="w-full mb-2 px-3 py-2 border rounded"
                defaultValue={editProduct?.description || ""}
              />
              <input
                name="img"
                type="file"
                accept="image/*"
                className="w-full mb-2"
              />
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  name="is_featured"
                  defaultChecked={!!editProduct?.is_featured}
                  value="1"
                />
                <span>Featured</span>
              </label>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => {
                    setShowModal(false);
                    setEditProduct(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  {editProduct ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
