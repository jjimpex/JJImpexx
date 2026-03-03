import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/brandProducts.css";

export default function BrandProducts() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    api.get(`/brands/${slug}`).then(res => {
      setBrand(res.data.brand);
      setProducts(res.data.products);
    });
  }, [slug]);

  return (
    <div className="brand-products">
      <h1>{brand?.name}</h1>

      <div className="products-grid">
        {products.map(p => (
          <div className="product-card" key={p._id}>
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}