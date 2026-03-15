import { useRef } from "react";
import "../../styles/values.css";
import {
  FaGlobeAsia,
  FaShieldAlt,
  FaTruck,
  FaHandshake,
  FaLeaf,
  FaWarehouse,
} from "react-icons/fa";

export default function Values() {
  const sliderRef = useRef(null);

  const scroll = (dir) => {
    const container = sliderRef.current;
    if (dir === "left") {
      container.scrollBy({ left: -350, behavior: "smooth" });
    } else {
      container.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <section className="values">
      {" "}
      <h2>Delivering World-Class Food Imports</h2>{" "}
      <div className="values-container">
        {" "}
        <button className="slider-arrow left" onClick={() => scroll("left")}>
          {" "}
          ‹{" "}
        </button>{" "}
        <div className="values-wrapper" ref={sliderRef}>
          {" "}
          <div className="value-card">
            {" "}
            <FaGlobeAsia className="icon green" />{" "}
            <h3>Direct Global Sourcing</h3>{" "}
            <p>
              Authentic products sourced directly from manufacturers worldwide.
            </p>{" "}
          </div>{" "}
          <div className="value-card">
            {" "}
            <FaShieldAlt className="icon blue" /> <h3>Food Safety First</h3>{" "}
            <p>Strict compliance and temperature-controlled logistics.</p>{" "}
          </div>{" "}
          <div className="value-card">
            {" "}
            <FaTruck className="icon orange" /> <h3>Reliable Distribution</h3>{" "}
            <p>Efficient B2B supply chain for hotels and QSRs.</p>{" "}
          </div>{" "}
          <div className="value-card">
            {" "}
            <FaHandshake className="icon purple" />{" "}
            <h3>Trusted Partnerships</h3>{" "}
            <p>Long-term partnerships with global brands.</p>{" "}
          </div>{" "}
          <div className="value-card">
            {" "}
            <FaLeaf className="icon green" /> <h3>Premium Quality</h3>{" "}
            <p>International food brands carefully selected.</p>{" "}
          </div>{" "}
          <div className="value-card">
            {" "}
            <FaWarehouse className="icon orange" />{" "}
            <h3>Efficient Warehousing</h3>{" "}
            <p>Modern storage maintaining freshness and safety.</p>{" "}
          </div>{" "}
        </div>{" "}
        <button className="slider-arrow right" onClick={() => scroll("right")}>
          {" "}
          ›{" "}
        </button>{" "}
      </div>{" "}
    </section>
  );
}
