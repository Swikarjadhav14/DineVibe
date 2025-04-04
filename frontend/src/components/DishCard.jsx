import { useCart } from '../context/CartContext';
import { useState } from 'react';

const DishCard = ({ dish, restaurantId, restaurantName }) => {
  const { addToCart, canAddToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);
  
  // Sample images for different dish categories
  const categoryImages = {
    Appetizers: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=800&auto=format&fit=crop&q=60',
    MainCourse: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60',
    Desserts: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&auto=format&fit=crop&q=60',
    Beverages: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop&q=60',
    default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60'
  };

  const imageUrl = categoryImages[dish.category] || categoryImages.default;

  const handleAddToCart = () => {
    if (canAddToCart(restaurantId)) {
      addToCart(dish, restaurantId, restaurantName);
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative">
      {showAlert && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-center z-10">
          You can only order from one restaurant at a time. Clear your cart first.
        </div>
      )}
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={dish.name}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md">
          <span className="text-xl font-bold text-orange-600">${dish.price}</span>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-md">
            {dish.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
          {dish.name}
        </h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-2">{dish.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {dish.isVegetarian && (
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Vegetarian
            </span>
          )}
          {dish.isSpicy && (
            <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Spicy
            </span>
          )}
        </div>
        <button 
          onClick={handleAddToCart}
          className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-300 group-hover:shadow-lg flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default DishCard; 