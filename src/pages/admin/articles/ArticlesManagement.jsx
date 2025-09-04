import { useState, useEffect } from "react";
import api from "../../../services/api";
import Table from "../../../components/Table";
import LoadingOverlay from "../../../components/LoadingOverlay";

export default function ArticlesManagement() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const perPage = 100;

  // Columns for the table
  const columns = [
    {
      key: "title",
      label: "Title",
      style: { minWidth: "200px" },
    },
    {
      key: "description",
      label: "Description",
      style: { minWidth: "300px" },
    },
    {
      key: "full_img_url",
      label: "Image",
      style: { width: "100px" },
      render: (value) => (
        <div className="w-16 h-16">
          <img
            src={value}
            alt="Article"
            className="w-full h-full object-cover rounded"
          />
        </div>
      ),
    },
    {
      key: "is_active",
      label: "Status",
      style: { width: "100px" },
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      style: { width: "150px" },
      render: (_, article) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(article)}
            className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(article)}
            className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch when page or debouncedSearch changes
  useEffect(() => {
    fetchArticles();
  }, [page, debouncedSearch]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/articles?page=${page}&search=${encodeURIComponent(
          debouncedSearch
        )}&per_page=${perPage}`
      );
      setArticles(response.data);
      setTotalPages(Math.ceil(response.total / perPage));
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleDelete = async (article) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      setLoading(true);
      await api.delete(`/articles/${article.id}`);
      await fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Failed to delete article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (selectedArticle) {
        formData.append("_method", "PUT");
        await api.post(`/articles/${selectedArticle.id}`, formData);
      } else {
        await api.post("/articles", formData);
      }
      await fetchArticles();
      setShowModal(false);
      setSelectedArticle(null);
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Failed to save article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Articles Management</h1>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search articles..."
            className="px-3 py-2 border rounded"
            style={{ minWidth: 200 }}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded shadow"
            onClick={() => {
              setSelectedArticle(null);
              setShowModal(true);
            }}
          >
            Add Article
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {loading && <LoadingOverlay />}
        <div className="p-4">
          <Table
            columns={columns}
            data={articles}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {selectedArticle ? "Edit Article" : "Add Article"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedArticle(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="w-6 h-6"
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
              </button>
            </div>
            <ArticleForm
              article={selectedArticle}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowModal(false);
                setSelectedArticle(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ArticleForm({ article, onSubmit, onCancel }) {
  const [imagePreview, setImagePreview] = useState(article?.img_url || null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="w-full px-3 py-2 border rounded"
        required
        defaultValue={article?.title || ""}
      />

      <textarea
        name="description"
        placeholder="Description"
        className="w-full px-3 py-2 border rounded"
        required
        rows={3}
        defaultValue={article?.description || ""}
      />

      <textarea
        name="content"
        placeholder="Content"
        className="w-full px-3 py-2 border rounded"
        required
        rows={5}
        defaultValue={article?.content || ""}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image
        </label>
        <div className="flex items-center gap-4">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-20 w-20 object-cover rounded"
            />
          )}
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImagePreview(URL.createObjectURL(file));
              }
            }}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            required={!article}
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={article?.is_active ?? true}
          value="1"
          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">Active</label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
