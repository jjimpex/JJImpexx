import { Link } from "react-router-dom";
import "../../styles/hero.css";

export default function Hero() {
  return (
    <section className="hero">
        <div className="announcement-bar">
        <div className="announcement-track">
          <span>🔥 Bulk order discounts available</span>
          <span>⭐ Trusted global brands available</span>
          <span>🎉 Special offer this month on selected products</span>

          {/* duplicate for smooth infinite loop */}
          <span>🔥 Bulk order discounts available</span>
          <span>⭐ Trusted global brands available</span>
          <span>🎉 Special offer this month on selected tools</span>
        </div>
      </div>
      <div className="hero-content">
        <h1>
          Global Distribution <br /> of Premium Industrial Products
        </h1>

        <p>
          JJImpex connects trusted global brands with customers across India.
          Discover premium tools, equipment, and industrial solutions.
        </p>

        <div className="hero-buttons">

          <a href="#brands" className="hero-btn primary">
  Explore Brands
</a>

          <Link to="/contact" className="hero-btn secondary">
            Contact Us
          </Link>

        </div>

      </div>

    </section>
  );
}