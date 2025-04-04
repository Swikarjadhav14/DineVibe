const Restaurant = require('../database/models/Restaurant');
const Dish = require('../database/models/Dish');

// Get all restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single restaurant
const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    // Get dishes for this restaurant
    const dishes = await Dish.find({ restaurant: restaurant._id });
    const restaurantWithDishes = {
      ...restaurant.toObject(),
      dishes
    };
    
    res.json(restaurantWithDishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get restaurant's dishes
const getRestaurantDishes = async (req, res) => {
  try {
    const dishes = await Dish.find({ restaurant: req.params.id });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurant,
  getRestaurantDishes
}; 