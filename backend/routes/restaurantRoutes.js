const express = require('express');
const router = express.Router();
const { getAllRestaurants, getRestaurant, getRestaurantDishes } = require('../controllers/restaurantController');

// Get all restaurants
router.get('/', getAllRestaurants);

// Get single restaurant
router.get('/:id', getRestaurant);

// Get restaurant's dishes
router.get('/:id/dishes', getRestaurantDishes);

module.exports = router; 