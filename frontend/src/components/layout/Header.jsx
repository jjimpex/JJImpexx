import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import "../../styles/header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  // 🔒 LOCK BODY SCROLL
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="navbar">
      {/* LOGO */}
      <Link to="/" className="logo">
        JJImpex
      </Link>

      {/* DESKTOP MENU */}
      <nav className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/contact">Contact Us</NavLink>
      </nav>

      {/* HAMBURGER */}
      <button
        className={`menu-btn ${open ? "open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* BACKDROP */}
      <div
        className={`mobile-backdrop ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${open ? "show" : ""}`}>
        {/* USER / CTA SECTION */}
        <div className="menu-user">
          <div className="avatar">G</div>
          <div className="user-info">
            <p className="user-name">Guest</p>
            <p className="user-sub">Guest User</p>
          </div>
        </div>

        <NavLink to="/" end onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/about" onClick={() => setOpen(false)}>
          About Us
        </NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>
          Contact Us
        </NavLink>

        {/* CTA */}
        <a
          href="https://wa.me/918826411312?text=Hello%20JJImpex,%20I%20need%20more%20information"
          target="_blank"
          rel="noreferrer"
          className="menu-cta"
        >
          <FaWhatsapp className="wa-icon" />
          <span>Message on WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
