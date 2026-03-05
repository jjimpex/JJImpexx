import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import "../styles/brandProducts.css";

export default function BrandProducts() {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api.get(`/brands/${slug}`)
      .then(res => {
        setBrand(res.data.brand);
        setProducts(res.data.products);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [slug]);

  if (loading) {
    return <Loader text="Please wait while we are loading products..." />;
  }

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