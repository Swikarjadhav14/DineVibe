import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DishCard from '../components/DishCard';
import { useCart } from '../context/CartContext';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentRestaurant, canAddToCart } = useCart();

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const [restaurantResponse, dishesResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/restaurants/${id}`),
          fetch(`${import.meta.env.VITE_API_URL}/api/restaurants/${id}/dishes`)
        ]);

        if (!restaurantResponse.ok || !dishesResponse.ok) {
          throw new Error('Failed to fetch restaurant details');
        }

        const restaurantData = await restaurantResponse.json();
        const dishesData = await dishesResponse.json();

        setRestaurant(restaurantData);
        setDishes(dishesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600 text-xl">Restaurant not found</div>
      </div>
    );
  }

  const canOrderFromThisRestaurant = canAddToCart(id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="relative bg-orange-600 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=60"
            alt={restaurant.name}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 py-16">
          <Link to="/" className="inline-flex items-center text-white mb-8 hover:text-orange-200 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Restaurants
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{restaurant.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-white text-orange-600 px-4 py-2 rounded-full font-semibold">
                  {restaurant.cuisine}
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{restaurant.rating}</span>
                </div>
              </div>
              <p className="text-xl opacity-90">{restaurant.description}</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-sm">{restaurant.location.address}</p>
                <p className="text-sm">{restaurant.location.city}, {restaurant.location.state}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Menu</h2>
          <div className="flex gap-4">
            <button className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors">
              Filter by Category
            </button>
            <button className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors">
              Sort by Price
            </button>
          </div>
        </div>
        
        {!canOrderFromThisRestaurant && currentRestaurant && (
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800">
              You already have items in your cart from another restaurant. 
              <Link to="/cart" className="text-blue-600 underline ml-1">View cart</Link> or 
              <button 
                onClick={() => window.location.href = '/cart'} 
                className="text-blue-600 underline ml-1"
              >
                clear your cart
              </button> 
              to order from this restaurant.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish) => (
            <DishCard 
              key={dish._id} 
              dish={dish} 
              restaurantId={id}
              restaurantName={restaurant.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail; 