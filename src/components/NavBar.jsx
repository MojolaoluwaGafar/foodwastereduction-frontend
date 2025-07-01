import { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const navItems = [
  { path: "/home", label: "Home" },
  {path: "/create-donation", label: "Create Donation"},
  { path: "/donations", label: "My Donations" },
];

const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const NavItems = ({ onClick }) => (
  <>
    {navItems.map(({ path, label }, index) => (
      <NavLink
        key={index}
        to={path}
        onClick={onClick}
        className={({ isActive }) =>
          `block px-4 py-2 rounded-lg text-md font-medium transition duration-200 
          ${
            isActive
              ? "text-green-700 font-semibold bg-green-50"
              : "hover:text-green-600 hover:bg-gray-100"
          }`
        }
      >
        {label}
      </NavLink>
    ))}
  </>
);

const UserMenu = ({ user, onLogout }) => (
  <div className="flex items-center space-x-4">
    <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow">
      {getInitials(user.fullName || user.name)}
    </div>
    <button
      onClick={onLogout}
      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-semibold"
    >
      Sign Out
    </button>
  </div>
);

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  console.log("Navbar user:", user);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/home" className="flex items-center space-x-2">
          <h1 className="text-2xl font-extrabold tracking-wide text-gray-900 dark:text-white">
            WasteLess
          </h1>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-2">
            <NavItems />
          </nav>
          {user?.email ? (
            <UserMenu user={user} onLogout={handleLogout} />
          ) : (
            <NavLink
              to="/signin"
              className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition font-semibold"
            >
              Sign In
            </NavLink>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-green-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 pt-2 pb-4 transition-all duration-300">
          <nav className="space-y-2 text-lg">
            <NavItems onClick={() => setMobileMenuOpen(false)} />
          </nav>

          {user?.email ? (
            <div className="mt-4 border-t pt-4 space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow">
                  {getInitials(user.fullName || user.name)}
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {user.fullName || user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition font-semibold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <NavLink
              to="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-4 w-full text-center px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition font-semibold"
            >
              Sign In
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
}
