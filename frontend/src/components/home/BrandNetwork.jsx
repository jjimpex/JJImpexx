import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/brandNetwork.css";

export default function BrandNetwork() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const marqueeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/brands")
      .then((res) => setBrands(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="brand-network">
      <h2>Our Global Brand Network</h2>

      {loading ? (
        <div className="brand-loader">
          <span className="loader"></span>
          <p>Please wait while we are loading brands...</p>
        </div>
      ) : (
        <div className="marquee-wrapper">
          <div className="marquee">
            {[...Array(6)].map((_, i) => (
              <div className="marquee-group" key={i}>
                {brands.map((b) => (
                  <div
                    key={`${b._id}-${i}`}
                    className="brand-item"
                    onClick={() => navigate(`/brand/${b.slug}`)}
                  >
                    <div className="brand-circle">
                      <img
                        src={b.logo}
                        alt={b.name}
                        className="brand-logo"
                        draggable="false"
                      />
                    </div>
                    <span className="brand-name">{b.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
