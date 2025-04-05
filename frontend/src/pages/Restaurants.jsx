import { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
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
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/restaurants`);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        const data = await response.json();
        setRestaurants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = searchTerm === '' || 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesArea = selectedArea === '' || 
      restaurant.location.address.toLowerCase().includes(selectedArea.toLowerCase());
    
    const matchesCuisine = selectedCuisine === '' || 
      restaurant.cuisine === selectedCuisine;

    return matchesSearch && matchesArea && matchesCuisine;
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
    <div className="min-h-screen pt-16">
      {/* Header Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">All Restaurants</h1>
          <p className="text-gray-600 max-w-2xl">
            Discover the best restaurants in Pune. Filter by area, cuisine, or search for your favorite spot.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Search Input */}
          <div>
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent"
            />
          </div>

          {/* Area Filter */}
          <div>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent"
            >
              <option value="">All Areas</option>
              {puneAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          {/* Cuisine Filter */}
          <div>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent"
            >
              <option value="">All Cuisines</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredRestaurants.length} restaurants
          </p>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No restaurants found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants; 