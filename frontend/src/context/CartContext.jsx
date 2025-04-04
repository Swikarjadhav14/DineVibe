import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);

  const addToCart = (dish, restaurantId, restaurantName) => {
    setCart((prevCart) => {
      // If cart is empty, add the item and set the current restaurant
      if (prevCart.length === 0) {
        setCurrentRestaurant(restaurantId);
        return [{ 
          ...dish, 
          quantity: 1,
          restaurantId,
          restaurantName
        }];
      }

      // If adding from the same restaurant
      if (currentRestaurant === restaurantId) {
        const existingItem = prevCart.find((item) => item._id === dish._id);
        if (existingItem) {
          return prevCart.map((item) =>
            item._id === dish._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { 
          ...dish, 
          quantity: 1,
          restaurantId,
          restaurantName
        }];
      }

      // If trying to add from a different restaurant, return current cart
      return prevCart;
    });
  };

  const removeFromCart = (dishId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item._id !== dishId);
      // If cart is now empty, reset the current restaurant
      if (newCart.length === 0) {
        setCurrentRestaurant(null);
      }
      return newCart;
    });
  };

  const updateQuantity = (dishId, quantity) => {
    if (quantity < 1) return;
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === dishId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCurrentRestaurant(null);
  };

  const getCartTotal = () => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryFee = 5.99; // Fixed delivery fee
    const tax = subtotal * 0.08; // 8% tax
    
    return subtotal + deliveryFee + tax;
  };

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const canAddToCart = (restaurantId) => {
    return cart.length === 0 || currentRestaurant === restaurantId;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        currentRestaurant,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartSubtotal,
        getCartItemCount,
        canAddToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 