import { useState, useEffect } from "react";
import api from "../services/api";
import LoadingOverlay from "./LoadingOverlay";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [start, setStart] = useState(0);
  const visibleCount = 3;
  const canScrollLeft = start > 0;
  const canScrollRight = start + visibleCount < testimonials.length;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          "/testimonials?is_active=true&per_page=100"
        );

        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleLeft = () => {
    if (canScrollLeft) setStart(start - 1);
  };
  const handleRight = () => {
    if (canScrollRight) setStart(start + 1);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-green-100 to-blue-100 relative">
      {loading && <LoadingOverlay />}
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          What People Think About Us
        </h2>
        <div className="flex items-center justify-center gap-4 relative">
          <button
            onClick={handleLeft}
            disabled={!canScrollLeft}
            className={`transition-all duration-200 bg-white shadow-lg rounded-full p-3 flex items-center justify-center hover:bg-green-200 ${
              !canScrollLeft
                ? "opacity-30 cursor-not-allowed"
                : "hover:scale-110"
            } mr-2`}
            aria-label="Scroll left"
            style={{ position: "relative", zIndex: 2 }}
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="12" fill="#e5f9ee" />
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {error ? (
              <div className="col-span-3 text-center text-red-600">{error}</div>
            ) : (
              testimonials.slice(start, start + visibleCount).map((t, i) => (
                <div
                  key={t.id || start + i}
                  className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
                >
                  <img
                    src={t.img_url}
                    alt={t.name}
                    className="w-20 h-20 rounded-full mb-4 border-4 border-green-300"
                  />
                  <p className="text-gray-700 italic mb-3 text-center">
                    "{t.content}"
                  </p>
                  <div className="text-center">
                    <span className="font-semibold text-green-700">
                      {t.name}
                    </span>
                    {t.position && (
                      <span className="block text-sm text-gray-600">
                        {t.position}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            onClick={handleRight}
            disabled={!canScrollRight}
            className={`transition-all duration-200 bg-white shadow-lg rounded-full p-3 flex items-center justify-center hover:bg-green-200 ${
              !canScrollRight
                ? "opacity-30 cursor-not-allowed"
                : "hover:scale-110"
            } ml-2`}
            aria-label="Scroll right"
            style={{ position: "relative", zIndex: 2 }}
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="12" fill="#e5f9ee" />
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
