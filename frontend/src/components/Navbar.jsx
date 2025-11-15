import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 dark:text-gray-300";

  // Load stored theme
  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    setTheme(stored);
    document.documentElement.classList.toggle("dark", stored === "dark");
  }, []);

  // Toggle theme
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
        ⚡ GEFCom Energy
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <Link className={isActive("/")} to="/">Home</Link>
        <Link className={isActive("/predict")} to="/predict">Predict</Link>
        <a href="/bulk" className="hover:underline">Bulk Predict</a>
        <Link className={isActive("/analytics")} to="/analytics">Analytics</Link>
        <Link className={isActive("/login")} to="/login">Login</Link>

        {/* Theme Button */}
        <button
          onClick={switchTheme}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col py-4 md:hidden">

          <Link
            className={`px-6 py-2 ${isActive("/")}`}
            to="/"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          <Link
            className={`px-6 py-2 ${isActive("/predict")}`}
            to="/predict"
            onClick={() => setMobileOpen(false)}
          >
            Predict
          </Link>

          <Link
            className={`px-6 py-2 ${isActive("/analytics")}`}
            to="/analytics"
            onClick={() => setMobileOpen(false)}
          >
            Analytics
          </Link>

          <Link
            className={`px-6 py-2 ${isActive("/login")}`}
            to="/login"
            onClick={() => setMobileOpen(false)}
          >
            Login
          </Link>

          {/* Theme Switch Mobile */}
          <button
            onClick={switchTheme}
            className="px-6 py-2 flex items-center gap-2 text-gray-700 dark:text-gray-300"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            Switch Theme
          </button>
        </div>
      )}
    </nav>
  );
}
