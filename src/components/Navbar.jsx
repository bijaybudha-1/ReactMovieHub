import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { theme, toggleTheme } = useAppContext();

  // Handle scroll for navbar bg
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  const navLinks = [
    { path: "/home", label: "Home", icon: "bx-home-alt" },
    { path: "/movies", label: "Movies", icon: "bx-film" },
    { path: "/tv", label: "TV Shows", icon: "bx-tv" },
    { path: "/favorites", label: "Watchlist", icon: "bx-bookmark" },
    { path: "/news", label: "News", icon: "bx-news" },
    { path: "/contact", label: "Contact", icon: "bx-envelope" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] border-b transition-all duration-250 ${
          isScrolled
            ? theme === "light" 
              ? "bg-white/90 backdrop-blur-xl border-border-color" 
              : "bg-black/85 backdrop-blur-[20px] saturate-180 border-border-color"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="container-custom flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link
            to="/home"
            onClick={closeMobileNav}
            className="text-xl font-extrabold bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent tracking-tight hover:opacity-85"
          >
            MovieHub
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-250 relative ${
                    isActive
                      ? 'text-text-primary bg-glass-bg-hover after:content-[""] after:absolute after:-bottom-[1px] after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-0.5 after:bg-primary after:rounded-full'
                      : "text-text-secondary hover:text-text-primary hover:bg-glass-bg-hover"
                  }`
                }
              >
                <i className={`bx ${link.icon} text-xl`}></i>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <SearchBar />
            </div>

            <button
              onClick={toggleTheme}
              title="Toggle theme"
              className="flex items-center justify-center w-9 h-9 border border-border-color rounded-full bg-glass-bg text-text-secondary text-lg cursor-pointer transition-all duration-250 hover:bg-glass-bg-hover hover:text-primary hover:border-primary"
            >
              <i
                className={`bx ${theme === "dark" ? "bx-sun" : "bx-moon"}`}
              ></i>
            </button>

            <Link
              to="/profile"
              className="w-9 h-9 rounded-full border-2 border-border-color overflow-hidden hover:border-primary transition-colors duration-250"
            >
              <img
                src="https://ui-avatars.com/api/?name=User&background=e50914&color=fff&size=36"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </Link>

            {/* Hamburger */}
            <div
              className={`flex lg:hidden flex-col gap-[5px] cursor-pointer p-2 ${
                isMobileNavOpen ? "active" : ""
              }`}
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            >
              <span
                className={`w-[22px] h-[2px] bg-text-primary rounded-sm transition-all duration-250 ${
                  isMobileNavOpen
                    ? "rotate-45 translate-x-[5px] translate-y-[5px]"
                    : ""
                }`}
              ></span>
              <span
                className={`w-[22px] h-[2px] bg-text-primary rounded-sm transition-all duration-250 ${
                  isMobileNavOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-[22px] h-[2px] bg-text-primary rounded-sm transition-all duration-250 ${
                  isMobileNavOpen
                    ? "-rotate-45 translate-x-[5px] -translate-y-[5px]"
                    : ""
                }`}
              ></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      <div
        className={`fixed top-[72px] left-0 right-0 bg-bg-secondary border-b border-border-color p-6 z-[999] transition-all duration-400 ease-in-out ${
          isMobileNavOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-[120%] opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMobileNav}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full p-4 text-base font-medium rounded-md transition-colors ${
                  isActive
                    ? "text-text-primary bg-glass-bg-hover"
                    : "text-text-secondary hover:text-text-primary hover:bg-glass-bg-hover"
                }`
              }
            >
              <i className={`bx ${link.icon} text-xl`}></i>
              <span>{link.label}</span>
            </NavLink>
          ))}
          <div className="mt-4 w-full md:hidden">
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  );
}
