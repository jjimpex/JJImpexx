import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/brandNetwork.css";

export default function BrandNetwork() {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/brands").then(res => setBrands(res.data));
  }, []);

  return (
    <section className="brand-network">
      <h2>Our Global Brand Network</h2>

      <div className="marquee">
        {[...Array(2)].map((_, i) => (
          <div className="marquee-group" key={i}>
            {brands.map(b => (
              // <div
              //   key={b._id}
              //   className="brand-circle"
              //   onClick={() => navigate(`/brand/${b.slug}`)}
              // >
              //   {b.name}
              // </div>
              <div
  key={b._id}
  className="brand-circle"
  onClick={() => navigate(`/brand/${b.slug}`)}
>
  <img
    src={b.logo}          // ✅ USE DB FIELD DIRECTLY
    alt={b.name}
    className="brand-logo"
    draggable="false"
  />
</div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}