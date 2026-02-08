import React, { useState, useEffect } from "react";
import icon from "../assets/image/icon.png";
import {
  IoMoon,
  IoSunny,
  IoDownloadOutline,
  IoMenu,
  IoClose
} from "react-icons/io5";

function Header({
  isAdmin,
  onLogout,
  onLoginToggle,
  onInstall,
  isInstalling = false,
  theme,
  toggleTheme,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled || isMobileMenuOpen
          ? "py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm dark:shadow-slate-900/50"
          : "py-5 bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">

          {/* --- Brand --- */}
          <div className="flex items-center gap-3 select-none z-50 relative">
            <img
              src={icon}
              alt="Logo"
              className="w-9 h-9 rounded-xl shadow-md"
            />
            <div className="text-xl font-black tracking-tighter">
              <span className="text-blue-600 dark:text-blue-400">Hakbang</span>
              <span className="text-yellow-500">Quest</span>
            </div>
          </div>

          {/* --- Desktop Actions (Hidden on Mobile) --- */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <IoSunny size={20} /> : <IoMoon size={20} />}
            </button>

            {/* Admin / Logout */}
            <button
              onClick={isAdmin ? onLogout : onLoginToggle}
              className="px-4 py-2.5 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              {isAdmin ? "Log Out" : "Admin"}
            </button>

            {/* Install Button */}
            <button
              onClick={onInstall}
              disabled={isInstalling}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 ${isInstalling
                  ? "bg-slate-400 cursor-wait"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                }`}
            >
              {!isInstalling && <IoDownloadOutline size={18} />}
              {isInstalling ? "Installing..." : "Install App"}
            </button>
          </div>

          {/* --- Mobile Toggles (Visible on Mobile) --- */}
          <div className="flex md:hidden items-center gap-2 z-50 relative">
            {/* Theme Toggle (Visible on Mobile Bar) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === "dark" ? <IoSunny size={20} /> : <IoMoon size={20} />}
            </button>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </div>

        {/* --- Mobile Menu Dropdown --- */}
        <div
          className={`absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="flex flex-col p-4 gap-3">
            {/* Admin Mobile */}
            <button
              onClick={() => {
                isAdmin ? onLogout() : onLoginToggle();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            >
              {isAdmin ? "Log Out" : "Admin Login"}
            </button>

            {/* Install Mobile */}
            <button
              onClick={() => {
                onInstall();
                setIsMobileMenuOpen(false);
              }}
              disabled={isInstalling}
              className={`w-full flex justify-center items-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-md ${isInstalling
                  ? "bg-slate-400 cursor-wait"
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {!isInstalling && <IoDownloadOutline size={18} />}
              {isInstalling ? "Installing..." : "Install App"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;