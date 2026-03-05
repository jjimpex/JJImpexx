import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const loggedIn = localStorage.getItem("adminLoggedIn");

  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>
          JJ Impex
        </div>

        {/* Desktop Menu */}
        <nav className={`nav ${menuOpen ? "active" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/brands">Brands</Link>
          <Link to="/contact">Contact</Link>

          {!loggedIn && (
            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </nav>

        {/* Hamburger */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

      </div>
    </header>
  );
}