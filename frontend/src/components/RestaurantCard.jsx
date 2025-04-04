import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  // Sample images for different cuisines
  const cuisineImages = {
    Italian: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60',
    Chinese: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&auto=format&fit=crop&q=60',
    Japanese: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60',
    Indian: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60',
    Mexican: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60',
    default: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60'
  };

  const imageUrl = cuisineImages[restaurant.cuisine] || cuisineImages.default;

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={restaurant.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-gray-700 font-semibold">{restaurant.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-medium shadow-md">
            {restaurant.cuisine}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
          {restaurant.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{restaurant.description}</p>
        <div className="flex items-center text-gray-500 mb-6">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">
            {restaurant.location.address}, {restaurant.location.city}
          </span>
        </div>
        <Link 
          to={`/restaurant/${restaurant._id}`}
          className="block w-full text-center bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-300 group-hover:shadow-lg"
        >
          View Menu
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard; 