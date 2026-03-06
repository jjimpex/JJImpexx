import { useState } from "react";
import "../styles/footer.css";

export default function Footer() {
  const [open, setOpen] = useState(null);

  const toggle = (section) => {
    setOpen(open === section ? null : section);
  };

  return (
    <footer className="footer">

      <div className="footer-section">
        <button className="footer-toggle" onClick={() => toggle("contact")}>
          Contact <span>{open === "contact" ? "−" : "+"}</span>
        </button>

        {open === "contact" && (
          <div className="footer-content">
            <p>Email: info@jjimpex.com</p>
            <p>Phone: +91 XXXXX XXXXX</p>
          </div>
        )}
      </div>

      <div className="footer-section">
        <button className="footer-toggle" onClick={() => toggle("about")}>
          About <span>{open === "about" ? "−" : "+"}</span>
        </button>

        {open === "about" && (
          <div className="footer-content">
            <p>
              JJ Impex imports premium global food products for restaurants,
              hotels and distributors.
            </p>
          </div>
        )}
      </div>

      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-btn"
      >
        💬 Message on WhatsApp
      </a>

      <div className="footer-bottom">
        © 2026 JJ Impex
      </div>

    </footer>
  );
}