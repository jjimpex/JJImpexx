import { useState } from "react";
import "../../styles/footer.css";

export default function Footer() {
  const [open, setOpen] = useState(null);

  const toggle = (section) => {
    setOpen(open === section ? null : section);
  };

  return (
    <footer className="footer">
      <div className="footer-section">
        <button className="footer-toggle" onClick={() => toggle("contact")}>
          Contact Info <span>{open === "contact" ? "−" : "+"}</span>
        </button>

        {open === "contact" && (
          <div className="footer-content">
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Email:</strong> sales@jjimpex.com</p>
            <p><strong>Address:</strong> Mumbai, Maharashtra, India</p>
          </div>
        )}
      </div>

      <div className="footer-section">
        <button className="footer-toggle" onClick={() => toggle("about")}>
          About Us <span>{open === "about" ? "−" : "+"}</span>
        </button>

        {open === "about" && (
          <div className="footer-content">
            <p>
              JJImpex is a premium food import & distribution company serving
              restaurants, hotels, QSRs and cloud kitchens across India.
            </p>
          </div>
        )}
      </div>

      <div className="footer-section">
        <button className="footer-toggle" onClick={() => toggle("faq")}>
          Frequently Asked Questions <span>{open === "faq" ? "−" : "+"}</span>
        </button>

        {open === "faq" && (
          <div className="footer-content">
            <p><strong>Do you sell B2C?</strong> No, we are B2B only.</p>
            <p><strong>Minimum order?</strong> Depends on category.</p>
            <p><strong>Delivery cities?</strong> PAN India.</p>
          </div>
        )}
      </div>

      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
      >
        💬 Message us on WhatsApp
      </a>

      <div className="footer-bottom">
        © 2026 JJImpex — Premium Grocery & Food Imports
      </div>
    </footer>
  );
}