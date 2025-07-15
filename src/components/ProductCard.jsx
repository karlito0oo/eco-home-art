import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, title, image, dimensions, description, category }) => {
  const navigate = useNavigate();

  const handleInquiry = () => {
    navigate(`/contact?product=${encodeURIComponent(title)}`);
  };

  const handleCardClick = () => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    navigate(`/products/${id}/${slug}`);
  };

  return (
    <div 
      className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
        
        {dimensions && (
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Dimensions:</span> {dimensions}
          </p>
        )}
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{description}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">{category}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleInquiry();
            }}
            className="rounded-full bg-green-800 p-2 text-white transition-colors hover:bg-green-700"
            aria-label={`Inquire about ${title}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 