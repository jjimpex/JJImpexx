import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/brandProducts.css";

export default function ShopByCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories").then(res => setCategories(res.data));
  }, []);

  return (
    <section className="shop-category">
      <h3>Shop by category</h3>

      <div className="category-grid">
        {categories.map(cat => (
          <Link
            to={`/category/${cat.slug}`}
            className="category-card"
            key={cat._id}
          >
            <div
              className="cat-icon"
              style={{ backgroundImage: `url(${cat.icon})` }}
            />
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}