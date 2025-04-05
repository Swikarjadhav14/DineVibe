import { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [useManualLocation, setUseManualLocation] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('');

  // Available areas in Pune
  const puneAreas = [
    'Katraj',
    'Swargate',
    'PCMC',
    'Kothrud',
    'Warje',
    'Koregaon Park',
    'Viman Nagar',
    'Hadapsar',
    'Bund Garden',
    'Deccan'
  ];

  // Available cuisines
  const cuisines = [
    'Indian',
    'Chinese',
    'Italian',
    'Mexican',
    'Fast Food'
  ];

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation && !useManualLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setUserLocation(null);
        }
      );
    }
  }, [useManualLocation]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/restaurants`);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        const data = await response.json();
        setRestaurants(data);
        
        // Filter restaurants based on location or selected area
        if (useManualLocation && selectedArea) {
          const areaRestaurants = data.filter(restaurant => 
            restaurant.location.address.toLowerCase().includes(selectedArea.toLowerCase())
          );
          setNearbyRestaurants(areaRestaurants);
        } else if (userLocation) {
          const nearby = data.filter(restaurant => {
            if (!restaurant.location?.coordinates?.latitude || !restaurant.location?.coordinates?.longitude) {
              return false;
            }
            
            const distance = calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              restaurant.location.coordinates.latitude,
              restaurant.location.coordinates.longitude
            );
            return distance <= 5;
          });
          setNearbyRestaurants(nearby);
        } else {
          setNearbyRestaurants([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [userLocation, selectedArea, useManualLocation]);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) {
      return Infinity;
    }

    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const toRad = (value) => {
    return value * Math.PI / 180;
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    // Apply search filter
    const matchesSearch = searchTerm
      ? restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    // Apply cuisine filter
    const matchesCuisine = selectedCuisine === 'All' || !selectedCuisine
      ? true
      : restaurant.cuisine.toLowerCase() === selectedCuisine.toLowerCase();

    // Apply location filter
    const matchesLocation = nearbyRestaurants.length > 0
      ? nearbyRestaurants.some(r => r._id === restaurant._id)
      : true;

    return matchesSearch && matchesCuisine && matchesLocation;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=60"
            alt="Restaurant background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70"></div>
        </div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Amazing Restaurants in Pune
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Find the best food near you and experience culinary excellence
            </p>
            
            {/* Location Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={!useManualLocation}
                    onChange={() => setUseManualLocation(false)}
                    className="form-radio"
                  />
                  <span>Use my location</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={useManualLocation}
                    onChange={() => setUseManualLocation(true)}
                    className="form-radio"
                  />
                  <span>Select area</span>
                </label>
              </div>

              {useManualLocation && (
                <div className="max-w-md mx-auto">
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="">Select an area</option>
                    {puneAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Cuisine Selection */}
            <div className="max-w-xl mx-auto mb-6">
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="">All Cuisines</option>
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Restaurants Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {searchTerm 
              ? 'Search Results' 
              : useManualLocation && selectedArea
              ? `Restaurants in ${selectedArea}`
              : userLocation
              ? 'Restaurants Near You'
              : 'All Restaurants'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {searchTerm 
              ? 'Find your favorite restaurants'
              : useManualLocation && selectedArea
              ? `Explore restaurants in ${selectedArea}`
              : userLocation
              ? 'Explore our curated selection of the finest restaurants in your area'
              : 'Browse through all restaurants in Pune'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Delivery</h3>
              <p className="text-gray-600">Get your favorite food delivered right to your doorstep</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Food</h3>
              <p className="text-gray-600">Enjoy the finest quality food from top-rated restaurants</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Best Service</h3>
              <p className="text-gray-600">Experience exceptional service from our partner restaurants</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 