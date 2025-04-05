import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[#E23744]">
            DineVibe
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-[#E23744]">
              Home
            </Link>
            <Link to="/restaurants" className="text-gray-600 hover:text-[#E23744]">
              Restaurants
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-[#E23744] relative">
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E23744] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-600">Hello, {user.name}</span>
                <button
                  onClick={logout}
                  className="bg-[#E23744] text-white px-4 py-2 rounded-lg hover:bg-[#C62F3B]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                className="bg-[#E23744] text-white px-4 py-2 rounded-lg hover:bg-[#C62F3B]"
                onClick={() => document.getElementById('auth-modal').classList.remove('hidden')}
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600 hover:text-[#E23744]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 