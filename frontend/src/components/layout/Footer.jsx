import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import InquiryForm from "../InquiryForm";
import FeedbackForm from "../FeedbackForm";
import { FaWhatsapp, FaPlus, FaMinus } from "react-icons/fa";
import "../../styles/footer.css";

const AccordionSection = ({ id, title, active, toggleSection, children }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");
  const location = useLocation();
  const message = "Hello JJImpex, I would like to enquire about your products.";
  const whatsappLink = `https://wa.me/918826411312?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    if (active === id) {
      setHeight(contentRef.current.scrollHeight + "px");
    } else {
      setHeight("0px");
    }
  }, [active, id, location]);

  return (
    <div className="footer-accordion">
      <div
        className={`footer-header ${active === id ? "active" : ""}`}
        onClick={() => toggleSection(id)}
      >
        <h4>{title}</h4>
        {active === id ? <FaMinus /> : <FaPlus />}
      </div>

      <div ref={contentRef} className="footer-content" style={{ height }}>
        <div className="footer-inner">{children}</div>
      </div>
    </div>
  );
};

export default function Footer() {
  const [active, setActive] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const toggleSection = (section) => {
    setActive(active === section ? null : section);
  };

  return (
    <footer id="footer" className="footer">
      <div className="footer-container">
        {/* CONTACT INFO */}
        <AccordionSection
          id="contact"
          title="Contact Info"
          active={active}
          toggleSection={toggleSection}
        >
          <p>
            <b>Phone:</b> +91-9876543210
          </p>
          <p>
            <b>Email:</b> sales@jjimpex.com
          </p>
          <p>
            <b>Address:</b> JJ Impex, B-74 Basement, Suraj Park, Village
            Samaipur, Delhi
          </p>

          <div className="footer-map">
            <iframe
              title="JJImpex Location"
              src="https://www.google.com/maps?q=Suraj%20Park%20Delhi&output=embed"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </AccordionSection>

        {/* STORE */}
        <AccordionSection
          id="store"
          title="Our Store"
          active={active}
          toggleSection={toggleSection}
        >
          <ul>
            <li
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Why Choose Us
            </li>
          </ul>
        </AccordionSection>

        {/* LINKS */}
        <AccordionSection
          id="links"
          title="Useful Links"
          active={active}
          toggleSection={toggleSection}
        >
          <ul>
            <li>
              <a href="/privacy-policy.pdf" target="_blank">
                Privacy Policy
              </a>
            </li>

            <li
              onClick={() =>
                alert("We deliver across India within 5-7 working days.")
              }
            >
              Shipping Policy
            </li>

            <li>Terms & Conditions</li>
          </ul>
        </AccordionSection>

        {/* FAQ */}
        <AccordionSection
          id="faq"
          title="FAQ"
          active={active}
          toggleSection={toggleSection}
        >
          <Link
            to="/faq"
            onClick={() => {
              setActive(null); // close accordion
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="faq-link"
          >
            View Frequently Asked Questions →
          </Link>
        </AccordionSection>

        {/* ACTION BUTTONS */}
        <div className="footer-actions">
          <div className="footer-buttons">
            <button
              className="contact-btn"
              onClick={() => setShowContact(true)}
            >
              Enquire
            </button>

            <button
              className="feedback-btn"
              onClick={() => setShowFeedback(true)}
            >
              Feedback
            </button>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            <FaWhatsapp />
            Message Us on WhatsApp
          </a>
        </div>
      </div>

      <div className="footer-bottom">© 2026 JJImpex. All rights reserved.</div>

      {showContact && <InquiryForm close={() => setShowContact(false)} />}
      {showFeedback && <FeedbackForm close={() => setShowFeedback(false)} />}
    </footer>
  );
}
