const connectDB = require('./connection');
const Restaurant = require('./models/Restaurant');
const Dish = require('./models/Dish');

const restaurants = [
  {
    name: "Spice Garden",
    location: {
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    },
    description: "Authentic Indian cuisine with a modern twist",
    image: "https://example.com/spice-garden.jpg",
    rating: 4.5,
    cuisine: "Indian",
    isOpen: true
  },
  {
    name: "Sushi Master",
    location: {
      address: "456 Ocean Drive",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001"
    },
    description: "Premium Japanese sushi and sashimi",
    image: "https://example.com/sushi-master.jpg",
    rating: 4.8,
    cuisine: "Japanese",
    isOpen: true
  },
  {
    name: "Pizza Paradise",
    location: {
      address: "789 Italian Way",
      city: "Chicago",
      state: "IL",
      zipCode: "60601"
    },
    description: "Traditional Italian pizzas and pastas",
    image: "https://example.com/pizza-paradise.jpg",
    rating: 4.3,
    cuisine: "Italian",
    isOpen: true
  },
  {
    name: "Taco Fiesta",
    location: {
      address: "321 Spice Street",
      city: "San Diego",
      state: "CA",
      zipCode: "92101"
    },
    description: "Authentic Mexican street tacos",
    image: "https://example.com/taco-fiesta.jpg",
    rating: 4.6,
    cuisine: "Mexican",
    isOpen: true
  },
  {
    name: "Golden Dragon",
    location: {
      address: "654 Chinatown Road",
      city: "San Francisco",
      state: "CA",
      zipCode: "94101"
    },
    description: "Classic Chinese cuisine",
    image: "https://example.com/golden-dragon.jpg",
    rating: 4.4,
    cuisine: "Chinese",
    isOpen: true
  },
  {
    name: "Mediterranean Delight",
    location: {
      address: "987 Olive Lane",
      city: "Miami",
      state: "FL",
      zipCode: "33101"
    },
    description: "Fresh Mediterranean cuisine",
    image: "https://example.com/mediterranean-delight.jpg",
    rating: 4.7,
    cuisine: "Mediterranean",
    isOpen: true
  },
  {
    name: "BBQ Master",
    location: {
      address: "147 Smoke Street",
      city: "Austin",
      state: "TX",
      zipCode: "78701"
    },
    description: "Authentic Texas BBQ",
    image: "https://example.com/bbq-master.jpg",
    rating: 4.9,
    cuisine: "American",
    isOpen: true
  },
  {
    name: "Thai Spice",
    location: {
      address: "258 Curry Road",
      city: "Seattle",
      state: "WA",
      zipCode: "98101"
    },
    description: "Authentic Thai cuisine",
    image: "https://example.com/thai-spice.jpg",
    rating: 4.5,
    cuisine: "Thai",
    isOpen: true
  },
  {
    name: "Greek Gods",
    location: {
      address: "369 Zeus Avenue",
      city: "Boston",
      state: "MA",
      zipCode: "02101"
    },
    description: "Traditional Greek cuisine",
    image: "https://example.com/greek-gods.jpg",
    rating: 4.6,
    cuisine: "Greek",
    isOpen: true
  },
  {
    name: "Soul Food Express",
    location: {
      address: "741 Soul Street",
      city: "New Orleans",
      state: "LA",
      zipCode: "70101"
    },
    description: "Authentic Southern soul food",
    image: "https://example.com/soul-food-express.jpg",
    rating: 4.8,
    cuisine: "Southern",
    isOpen: true
  },
  {
    name: "Vegan Haven",
    location: {
      address: "852 Green Street",
      city: "Portland",
      state: "OR",
      zipCode: "97201"
    },
    description: "Plant-based cuisine with creative flavors",
    image: "https://example.com/vegan-haven.jpg",
    rating: 4.7,
    cuisine: "Vegan",
    isOpen: true
  },
  {
    name: "Ramen House",
    location: {
      address: "963 Noodle Lane",
      city: "Denver",
      state: "CO",
      zipCode: "80201"
    },
    description: "Authentic Japanese ramen and small plates",
    image: "https://example.com/ramen-house.jpg",
    rating: 4.6,
    cuisine: "Japanese",
    isOpen: true
  },
  {
    name: "Burger Joint",
    location: {
      address: "741 Patty Place",
      city: "Nashville",
      state: "TN",
      zipCode: "37201"
    },
    description: "Gourmet burgers and craft beers",
    image: "https://example.com/burger-joint.jpg",
    rating: 4.4,
    cuisine: "American",
    isOpen: true
  },
  {
    name: "Falafel King",
    location: {
      address: "852 Middle East Road",
      city: "Philadelphia",
      state: "PA",
      zipCode: "19101"
    },
    description: "Fresh Mediterranean street food",
    image: "https://example.com/falafel-king.jpg",
    rating: 4.5,
    cuisine: "Mediterranean",
    isOpen: true
  }
];

const dishes = [
  {
    name: "Butter Chicken",
    description: "Tender chicken in rich tomato sauce",
    price: 16.99,
    image: "https://example.com/butter-chicken.jpg",
    category: "Main Course",
    isVegetarian: false,
    isSpicy: true
  },
  {
    name: "California Roll",
    description: "Crab, avocado, and cucumber roll",
    price: 12.99,
    image: "https://example.com/california-roll.jpg",
    category: "Main Course",
    isVegetarian: false,
    isSpicy: false
  },
  {
    name: "Margherita Pizza",
    description: "Classic tomato and mozzarella pizza",
    price: 14.99,
    image: "https://example.com/margherita-pizza.jpg",
    category: "Main Course",
    isVegetarian: true,
    isSpicy: false
  },
  {
    name: "Carne Asada Tacos",
    description: "Grilled beef tacos with onions and cilantro",
    price: 13.99,
    image: "https://example.com/carne-asada-tacos.jpg",
    category: "Main Course",
    isVegetarian: false,
    isSpicy: true
  },
  {
    name: "Kung Pao Chicken",
    description: "Spicy diced chicken with peanuts",
    price: 15.99,
    image: "https://example.com/kung-pao-chicken.jpg",
    category: "Main Course",
    isVegetarian: false,
    isSpicy: true
  },
  {
    name: "Greek Salad",
    description: "Fresh vegetables with feta cheese",
    price: 11.99,
    image: "https://example.com/greek-salad.jpg",
    category: "Appetizer",
    isVegetarian: true,
    isSpicy: false
  },
  {
    name: "Brisket Platter",
    description: "Slow-cooked beef brisket with sides",
    price: 24.99,
    image: "https://example.com/brisket-platter.jpg",
    category: "Main Course",
    isVegetarian: false,
    isSpicy: false
  },
  {
    name: "Pad Thai",
    description: "Stir-fried rice noodles with shrimp",
    price: 14.99,
    image: "https://example.com/pad-thai.jpg",
    category: "Main Course",
    isVegetarian: false,
    isSpicy: true
  },
  {
    name: "Moussaka",
    description: "Layered eggplant and meat casserole",
    price: 16.99,
    image: "https://example.com/moussaka.jpg",
    category: "Main Course",
    isVegetarian: false,
    isSpicy: false
  },
  {
    name: "Jambalaya",
    description: "Spicy rice with shrimp and sausage",
    price: 18.99,
    image: "https://example.com/jambalaya.jpg",
    category: "Main Course",
    isVegetarian: false,
    isSpicy: true
  },
  {
    name: "Mushroom Risotto",
    description: "Creamy Arborio rice with wild mushrooms",
    price: 18.99,
    image: "https://example.com/mushroom-risotto.jpg",
    category: "Main Course",
    isVegetarian: true,
    isSpicy: false
  },
  {
    name: "Tonkotsu Ramen",
    description: "Rich pork bone broth with chashu and egg",
    price: 16.99,
    image: "https://example.com/tonkotsu-ramen.jpg",
    category: "Main Course",
    isVegetarian: false,
    isSpicy: false
  },
  {
    name: "Truffle Burger",
    description: "Wagyu beef with truffle aioli and aged cheddar",
    price: 22.99,
    image: "https://example.com/truffle-burger.jpg",
    category: "Main Course",
    isVegetarian: false,
    isSpicy: false
  },
  {
    name: "Falafel Bowl",
    description: "Crispy falafel with hummus and tabbouleh",
    price: 14.99,
    image: "https://example.com/falafel-bowl.jpg",
    category: "Main Course",
    isVegetarian: true,
    isSpicy: false
  },
  {
    name: "Cauliflower Steak",
    description: "Grilled cauliflower with tahini sauce",
    price: 16.99,
    image: "https://example.com/cauliflower-steak.jpg",
    category: "Main Course",
    isVegetarian: true,
    isSpicy: false
  },
  {
    name: "Miso Black Cod",
    description: "Marinated black cod with miso glaze",
    price: 28.99,
    image: "https://example.com/miso-black-cod.jpg",
    category: "Main Course",
    isVegetarian: false,
    isSpicy: false
  },
  {
    name: "Buffalo Cauliflower",
    description: "Crispy cauliflower with buffalo sauce",
    price: 12.99,
    image: "https://example.com/buffalo-cauliflower.jpg",
    category: "Appetizer",
    isVegetarian: true,
    isSpicy: true
  },
  {
    name: "Shakshuka",
    description: "Eggs poached in spicy tomato sauce",
    price: 15.99,
    image: "https://example.com/shakshuka.jpg",
    category: "Main Course",
    isVegetarian: true,
    isSpicy: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Restaurant.deleteMany({});
    await Dish.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Insert restaurants first
    const insertedRestaurants = await Restaurant.insertMany(restaurants);
    console.log('Added restaurants');
    
    // Associate dishes with restaurants and insert them
    const dishesWithRestaurants = dishes.map((dish, index) => ({
      ...dish,
      restaurant: insertedRestaurants[index % insertedRestaurants.length]._id
    }));
    
    const insertedDishes = await Dish.insertMany(dishesWithRestaurants);
    console.log('Added dishes');
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 