import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import LoadingOverlay from "../components/LoadingOverlay";

export default function ArticleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/articles/${id}`);
        setArticle(response);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Failed to load article details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <div
      className="max-w-2xl mx-auto py-16 px-4"
      style={{ paddingTop: "120px" }}
    >
      {loading && <LoadingOverlay />}

      {!loading && error && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-red-600">{error}</h2>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      )}

      {!loading && !article && !error && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-red-600">
            Article not found
          </h2>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                const el = document.getElementById("articles-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          >
            Go Back
          </button>
        </div>
      )}

      {!loading && article && (
        <>
          {article.img_url && (
            <img
              src={article.img_url}
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          <h2 className="text-3xl font-bold mb-6 text-green-700">
            {article.title}
          </h2>
          <p
            className="mb-8 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></p>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </>
      )}
    </div>
  );
}
