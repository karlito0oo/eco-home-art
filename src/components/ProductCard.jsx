import { useNavigate } from 'react-router-dom';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductCard = ({ id, title, price, oldPrice, image, isNew, isSale }) => {
  const navigate = useNavigate();

  const handleInquiry = () => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    navigate(`/products/${id}/${slug}`);
  };

  return (
    <div 
      className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
      onClick={handleInquiry}
    >
      {/* Badge */}
      {(isNew || isSale) && (
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-sm font-semibold text-white ${
          isNew ? 'bg-teal-600' : 'bg-rose-400'
        }`}>
          {isNew ? 'New' : 'Sales'}
        </span>
      )}

      {/* Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={image || 'https://placehold.co/600x600/e2e8f0/94a3b8?text=Product+Image'}
          alt={title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">{formatPrice(price)}</span>
            {oldPrice && (
              <span className="text-sm text-gray-500 line-through">{formatPrice(oldPrice)}</span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleInquiry();
            }}
            className="rounded-full bg-teal-600 p-2 text-white transition-colors hover:bg-teal-700"
            aria-label={`View details for ${title}`}
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