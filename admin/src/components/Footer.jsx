import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div>
          <h3>JJ Impex</h3>
          <p>Premium imported food products.</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <p>Home</p>
          <p>Products</p>
          <p>Brands</p>
        </div>

        <div>
          <h4>Contact</h4>
          <p>Email: info@jjimpex.com</p>
          <p>Phone: +91 XXXXX XXXXX</p>
        </div>

      </div>

      <p className="copyright">
        © 2026 JJ Impex. All rights reserved.
      </p>
    </footer>
  );
}