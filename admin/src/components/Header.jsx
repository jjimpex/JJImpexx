import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import "../styles/header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const loggedIn = localStorage.getItem("adminLoggedIn");

  /* LOGOUT FUNCTION */
  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/login");
  };

  /* LOCK BODY SCROLL */
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => (document.body.style.overflow = "");
  }, [open]);

  /* AUTO CLOSE MENU ON ROUTE CHANGE */
  useEffect(() => {
    setOpen(false);
  }, [location]);

  /* STICKY SHADOW ON SCROLL */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar-shadow" : ""}`}>

      {/* LOGO */}
      <div className="logo" onClick={() => navigate("/dashboard")}>
        JJ Impex
      </div>

      {/* DESKTOP MENU */}
      <nav className="nav-links">
        <NavLink to="/dashboard">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/brands">Brands</NavLink>
        <a href="#contact">Contact</a>

        {!loggedIn ? (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        ) : (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </nav>

      {/* HAMBURGER */}
      <button
        className={`menu-btn ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* BACKDROP */}
      <div
        className={`mobile-backdrop ${open ? "show" : ""}`}
        onClick={closeMenu}
      />

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${open ? "show" : ""}`}>

        <NavLink to="/dashboard" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/products" onClick={closeMenu}>
          Products
        </NavLink>

        <NavLink to="/categories" onClick={closeMenu}>
          Categories
        </NavLink>

        <NavLink to="/brands" onClick={closeMenu}>
          Brands
        </NavLink>

        <a href="#contact" onClick={closeMenu}>
          Contact
        </a>

        {!loggedIn ? (
          <button
            className="mobile-login-btn"
            onClick={() => {
              closeMenu();
              navigate("/login");
            }}
          >
            Login
          </button>
        ) : (
          <button
            className="mobile-logout-btn"
            onClick={() => {
              closeMenu();
              logout();
            }}
          >
            Logout
          </button>
        )}

        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noreferrer"
          className="menu-cta"
        >
          <FaWhatsapp className="wa-icon" />
          Message on WhatsApp
        </a>

      </div>
    </header>
  );
}