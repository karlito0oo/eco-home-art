import { useEffect, useState } from "react";
import api from "../services/api";
import Table from "../components/Table";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const fetchCategories = () => {
    setLoading(true);
    api
      .get("/categories")
      .then((res) => {
        setCategories(res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    }
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setShowModal(true);
  };

  const columns = [
    {
      key: "name",
      label: "Name",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded shadow"
          onClick={() => {
            setEditCategory(null);
            setShowModal(true);
          }}
        >
          Add Category
        </button>
      </div>

      <Table
        columns={columns}
        data={categories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded shadow-lg p-8 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {editCategory ? "Edit Category" : "Add Category"}
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = {
                  name: formData.get("name"),
                };

                try {
                  if (editCategory) {
                    await api.put(`/categories/${editCategory.id}`, data);
                  } else {
                    await api.post("/categories", data);
                  }

                  setShowModal(false);
                  setEditCategory(null);
                  fetchCategories();
                } catch (error) {
                  console.error("Error saving category:", error);
                  alert(
                    "Error saving category: " +
                      (error.message || "Unknown error")
                  );
                }
              }}
            >
              <input
                name="name"
                placeholder="Category Name"
                className="w-full mb-2 px-3 py-2 border rounded"
                required
                defaultValue={editCategory?.name || ""}
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => {
                    setShowModal(false);
                    setEditCategory(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  {editCategory ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
