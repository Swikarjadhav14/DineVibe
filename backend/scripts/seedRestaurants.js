const mongoose = require('mongoose');
const Restaurant = require('../database/models/Restaurant');
require('dotenv').config();

const sampleRestaurants = [
  {
    name: "Pizza Palace",
    location: {
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    },
    description: "Best pizza in town with a wide variety of toppings",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.5,
    cuisine: "Italian",
    isOpen: true
  },
  {
    name: "Burger Joint",
    location: {
      address: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001"
    },
    description: "Gourmet burgers made with fresh, local ingredients",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.2,
    cuisine: "American",
    isOpen: true
  },
  {
    name: "Sushi Master",
    location: {
      address: "789 Pine St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94101"
    },
    description: "Authentic Japanese sushi and sashimi",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.8,
    cuisine: "Japanese",
    isOpen: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing restaurants
    await Restaurant.deleteMany({});
    console.log('Cleared existing restaurants');

    // Insert sample restaurants
    await Restaurant.insertMany(sampleRestaurants);
    console.log('Added sample restaurants');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 