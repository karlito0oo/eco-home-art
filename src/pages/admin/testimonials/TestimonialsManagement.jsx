import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import api from "../../../services/api";
import Table from "../../../components/Table";
import LoadingOverlay from "../../../components/LoadingOverlay";

export default function TestimonialsManagement() {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const perPage = 100;

  // Columns for the table
  const columns = [
    {
      key: "name",
      label: "Name",
      style: { minWidth: "150px" },
    },
    {
      key: "position",
      label: "Position",
      style: { minWidth: "150px" },
    },
    {
      key: "content",
      label: "Content",
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
            alt="Testimonial"
            className="w-full h-full object-cover rounded-full"
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
      render: (_, testimonial) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(testimonial)}
            className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(testimonial)}
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
    fetchTestimonials();
  }, [page, debouncedSearch]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/testimonials?page=${page}&search=${encodeURIComponent(
          debouncedSearch
        )}&per_page=${perPage}`
      );

      setTestimonials(response.data);
      setTotalPages(Math.ceil(response.total / perPage));
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowModal(true);
  };

  const handleDelete = async (testimonial) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      setLoading(true);
      await api.delete(`/testimonials/${testimonial.id}`);
      await fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Failed to delete testimonial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (selectedTestimonial) {
        formData.append("_method", "PUT");
        await api.post(`/testimonials/${selectedTestimonial.id}`, formData);
      } else {
        await api.post("/testimonials", formData);
      }
      await fetchTestimonials();
      setShowModal(false);
      setSelectedTestimonial(null);
    } catch (error) {
      console.error("Error saving testimonial:", error);
      alert("Failed to save testimonial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(testimonials);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      display_order: index + 1,
    }));

    setTestimonials(updatedItems);

    try {
      await api.post("/testimonials/reorder", {
        testimonials: updatedItems.map((item, index) => ({
          id: item.id,
          display_order: index + 1,
        })),
      });
    } catch (error) {
      console.error("Error updating display order:", error);
      alert("Failed to update order. Please try again.");
      await fetchTestimonials(); // Refresh the list on error
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Testimonials Management</h1>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search testimonials..."
            className="px-3 py-2 border rounded"
            style={{ minWidth: 200 }}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded shadow"
            onClick={() => {
              setSelectedTestimonial(null);
              setShowModal(true);
            }}
          >
            Add Testimonial
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {loading && <LoadingOverlay />}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="testimonials">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="p-4"
              >
                <Table
                  columns={columns}
                  data={testimonials}
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  dragHandleProps={(index) => ({
                    ...provided.droppableProps,
                    draggableProps: {
                      ...Draggable.getDraggableProps({
                        draggableId: `testimonial-${testimonials[index]?.id}`,
                        index,
                      }),
                    },
                  })}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {selectedTestimonial ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedTestimonial(null);
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
            <TestimonialForm
              testimonial={selectedTestimonial}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowModal(false);
                setSelectedTestimonial(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function TestimonialForm({ testimonial, onSubmit, onCancel }) {
  const [imagePreview, setImagePreview] = useState(
    testimonial?.img_url || null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Explicitly handle is_active checkbox
    const isActive = e.target.is_active.checked;
    formData.set('is_active', isActive ? '1' : '0');
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="w-full px-3 py-2 border rounded"
        required
        defaultValue={testimonial?.name || ""}
      />

      <input
        type="text"
        name="position"
        placeholder="Position"
        className="w-full px-3 py-2 border rounded"
        defaultValue={testimonial?.position || ""}
      />

      <textarea
        name="content"
        placeholder="Content"
        className="w-full px-3 py-2 border rounded"
        required
        rows={4}
        defaultValue={testimonial?.content || ""}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Photo
        </label>
        <div className="flex items-center gap-4">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-full"
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
            required={!testimonial}
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={testimonial?.is_active ?? true}
          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          value={1}
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
