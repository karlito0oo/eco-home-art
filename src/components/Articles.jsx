import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get("/articles?is_active=true&per_page=100");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const navigate = useNavigate();

  return (
    <section id="articles-section" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Articles
        </h2>

        {loading ? (
          // 🔄 Loading state
          <div className="flex justify-center items-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-700 border-t-transparent"></div>
          </div>
        ) : articles.length === 0 ? (
          // ❌ Empty state
          <p className="text-center text-gray-600 py-10">
            No articles available at the moment.
          </p>
        ) : (
          // ✅ Articles grid
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-gray-50 rounded-xl shadow-lg p-6 flex flex-col justify-between"
              >
                <div>
                  <img
                    src={article.full_img_url}
                    alt={article.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-green-700">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                </div>
                <button
                  className="mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  onClick={() => navigate(`/articles/${article.id}`)}
                >
                  Know More
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
