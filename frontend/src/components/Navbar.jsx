import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="#"
          className="font-bold text-indigo-600 text-lg"
          onClick={closeMenu}
        >
          Student-Teacher Connect
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          {!user && (
            <>
              <Link
                to="/login"
                className={`px-3 py-1 rounded hover:bg-gray-100 cursor-pointer ${
                  location.pathname === "/login"
                    ? "bg-indigo-100 text-indigo-600"
                    : ""
                }`}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className={`px-3 py-1 rounded cursor-pointer ${
                  location.pathname === "/register"
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-indigo-600 text-white"
                }`}
              >
                Sign up
              </Link>
            </>
          )}
          {user && user.role === "Teacher" && (
            <>
              <Link
                to="/addpost"
                className={`px-3 py-1 rounded hover:bg-gray-100 cursor-pointer ${
                  location.pathname === "/addpost"
                    ? "bg-indigo-100 text-indigo-600"
                    : ""
                }`}
              >
                Post
              </Link>
              <Link
                to="/dashboard"
                className={`px-3 py-1 rounded hover:bg-gray-100 cursor-pointer ${
                  location.pathname === "/dashboard"
                    ? "bg-indigo-100 text-indigo-600"
                    : ""
                }`}
              >
                Dashboard
              </Link>
            </>
          )}
          {user && user.role === "Student" && (
            <Link
              to="/student"
              className={`px-3 py-1 rounded hover:bg-gray-100 cursor-pointer ${
                location.pathname === "/student"
                  ? "bg-indigo-100 text-indigo-600"
                  : ""
              }`}
            >
              Assignments
            </Link>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded bg-red-50 text-red-600 cursor-pointer"
            >
              Logout
            </button>
          )}
        </nav>
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="px-4 py-2 space-y-2">
            {!user && (
              <>
                <Link
                  to="/login"
                  className={`block px-3 py-2 rounded hover:bg-gray-100 cursor-pointer ${
                    location.pathname === "/login"
                      ? "bg-indigo-100 text-indigo-600"
                      : ""
                  }`}
                  onClick={closeMenu}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className={`block px-3 py-2 rounded cursor-pointer ${
                    location.pathname === "/register"
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-indigo-600 text-white"
                  }`}
                  onClick={closeMenu}
                >
                  Sign up
                </Link>
              </>
            )}
            {user && user.role === "Teacher" && (
              <>
                <Link
                  to="/addpost"
                  className={`block px-3 py-2 rounded hover:bg-gray-100 cursor-pointer ${
                    location.pathname === "/addpost"
                      ? "bg-indigo-100 text-indigo-600"
                      : ""
                  }`}
                  onClick={closeMenu}
                >
                  Post
                </Link>
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded hover:bg-gray-100 cursor-pointer ${
                    location.pathname === "/dashboard"
                      ? "bg-indigo-100 text-indigo-600"
                      : ""
                  }`}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              </>
            )}
            {user && user.role === "Student" && (
              <Link
                to="/student"
                className={`block px-3 py-2 rounded hover:bg-gray-100 cursor-pointer ${
                  location.pathname === "/student"
                    ? "bg-indigo-100 text-indigo-600"
                    : ""
                }`}
                onClick={closeMenu}
              >
                Assignments
              </Link>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded bg-red-50 text-red-600 cursor-pointer"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
