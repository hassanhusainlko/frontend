import "./nav.css";
import logo from "/logo.png";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../../features/auth/authApi";

import { useState } from "react";

// Navbar Component
export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [logout] = useLogoutMutation();
  const loginHandler = async () => {
    if (token) {
      await logout();
      console.log("Logout");
    } else {
      navigate("/login");
      console.log("Navigate to login");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 md:h-20 z-50 bg-red-700 border-b border-red-900 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <a
              href="/"
              className="text-white hover:bg-red-800 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white hover:bg-red-800 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              About
            </a>
            <a
              href="#services"
              className="text-white hover:bg-red-800 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              Our Services
            </a>
            <a
              href="#quote"
              className="text-white hover:bg-red-800 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              Get A Quote
            </a>
            <a
              href="#how-we-work"
              className="text-white hover:bg-red-800 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
            >
              How We Work
            </a>
          </div>

          {/* Login Button - Desktop */}
          <button
            onClick={loginHandler}
            className="hidden lg:block bg-white text-red-700 hover:bg-gray-100 font-bold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {!token ? "Login" : "Logout"}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-red-800 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-red-800 py-4">
            <div className="flex flex-col space-y-2">
              <a
                href="/"
                className="text-white hover:bg-red-800 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-white hover:bg-red-800 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
              >
                About
              </a>
              <a
                href="#services"
                className="text-white hover:bg-red-800 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
              >
                Our Services
              </a>
              <a
                href="#quote"
                className="text-white hover:bg-red-800 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
              >
                Get A Quote
              </a>
              <a
                href="#how-we-work"
                className="text-white hover:bg-red-800 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
              >
                How We Work
              </a>
              <button
                onClick={loginHandler}
                className="bg-white text-red-700 hover:bg-gray-100 font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-md mx-4 mt-2"
              >
                {!token ? "Login" : "Logout"}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
