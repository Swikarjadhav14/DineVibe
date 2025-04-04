import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    getCartSubtotal,
    clearCart 
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      // If user is not logged in, show auth modal
      // This would be handled by the App component
      return;
    }

    // Create order details
    const orderDetails = {
      id: Math.random().toString(36).substr(2, 9),
      restaurant: cart[0]?.restaurantName || 'Multiple Restaurants',
      items: cart,
      subtotal: getCartSubtotal(),
      deliveryFee: 5.99,
      tax: getCartSubtotal() * 0.08,
      total: getCartTotal(),
      date: new Date().toISOString(),
      deliveryAddress: user.address
    };

    // Clear the cart
    clearCart();

    // Navigate to order confirmation with order details
    navigate('/order-confirmation', { state: { order: orderDetails } });
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const subtotal = getCartSubtotal();
  const deliveryFee = 5.99;
  const tax = subtotal * 0.08;
  const total = getCartTotal();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
      
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-blue-800">
          <span className="font-semibold">Restaurant:</span> {cart[0]?.restaurantName}
        </p>
      </div>
      
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between items-center font-bold">
            <span>Total:</span>
            <span className="text-xl">${total.toFixed(2)}</span>
          </div>
        </div>
        
        {!user && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800">
              Please sign in to complete your order.
            </p>
          </div>
        )}
        
        <button
          onClick={handleCheckout}
          className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors"
          disabled={!user}
        >
          {user ? 'Proceed to Checkout' : 'Sign In to Checkout'}
        </button>
      </div>
    </div>
  );
} 