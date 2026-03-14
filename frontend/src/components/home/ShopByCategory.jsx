import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Loader from "../../components/Loader";
import "../../styles/categoryGrid.css";

export default function ShopByCategory() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(true);

    api.get("/categories")
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  if (loading) {
    return (
      <Loader text="Please wait while we are loading categories..." />
    );
  }

  return (
    <section className="shop-category">

      <h3>Shop By Category</h3>

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