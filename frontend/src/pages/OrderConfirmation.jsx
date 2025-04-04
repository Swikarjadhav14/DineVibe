import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [estimatedDelivery, setEstimatedDelivery] = useState(null);

  useEffect(() => {
    // In a real app, this would come from your backend
    const order = location.state?.order;
    if (!order) {
      navigate('/');
      return;
    }

    setOrderDetails(order);
    
    // Calculate estimated delivery time (30-45 minutes from now)
    const now = new Date();
    const deliveryTime = new Date(now.getTime() + (35 * 60000)); // 35 minutes from now
    setEstimatedDelivery(deliveryTime);
  }, [location, navigate]);

  if (!orderDetails) return null;

  const subtotal = orderDetails.subtotal;
  const deliveryFee = orderDetails.deliveryFee;
  const tax = orderDetails.tax;
  const total = orderDetails.total;

  return (
    <div className="min-h-screen bg-emerald-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-emerald-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-emerald-900 mb-2">Order Confirmed!</h1>
            <p className="text-emerald-700">Thank you for your order</p>
          </div>

          <div className="space-y-6">
            <div className="border-b border-emerald-100 pb-4">
              <h2 className="text-xl font-semibold text-emerald-900 mb-4">Order Details</h2>
              <div className="space-y-2">
                <p className="text-emerald-700">Order ID: <span className="text-emerald-900">{orderDetails.id}</span></p>
                <p className="text-emerald-700">Restaurant: <span className="text-emerald-900">{orderDetails.restaurant}</span></p>
              </div>
            </div>

            <div className="border-b border-emerald-100 pb-4">
              <h2 className="text-xl font-semibold text-emerald-900 mb-4">Order Items</h2>
              <div className="space-y-3">
                {orderDetails.items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex justify-between items-center">
                    <div>
                      <p className="text-emerald-900">{item.name}</p>
                      <p className="text-sm text-emerald-700">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-emerald-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-b border-emerald-100 pb-4">
              <h2 className="text-xl font-semibold text-emerald-900 mb-4">Payment Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-emerald-700">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Delivery Fee:</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-emerald-100 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-emerald-900">Total Amount:</span>
                    <span className="text-2xl font-bold text-emerald-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-emerald-100 pb-4">
              <h2 className="text-xl font-semibold text-emerald-900 mb-4">Estimated Delivery</h2>
              <p className="text-emerald-700">
                Your order will be delivered by{' '}
                <span className="text-emerald-900 font-semibold">
                  {estimatedDelivery?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-emerald-900 mb-4">Delivery Address</h2>
              <p className="text-emerald-700">{orderDetails.deliveryAddress}</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/')}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 