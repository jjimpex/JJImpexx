import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";

import { FaBoxOpen, FaTags, FaLayerGroup } from "react-icons/fa";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    brands: 0,
    categories: 0,
  });

  const [recentProducts, setRecentProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const statsRes = await api.get("/admin/dashboard-stats");
      const productsRes = await api.get("/admin/recent-products");

      setStats(statsRes.data);
      setRecentProducts(productsRes.data);
    } catch (err) {
      console.log("Dashboard load error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading dashboard..." />;
  }

  return (
    <div className="dashboard-page">
      {/* STATS */}

      <div className="stats-grid">
        <Link to="/products" className="stats-card">
          <div className="stats-icon">
            <FaBoxOpen />
          </div>

          <div>
            <h3>{stats.products}</h3>
            <p>Total Products</p>
          </div>
        </Link>

        <Link to="/brands" className="stats-card">
          <div className="stats-icon">
            <FaTags />
          </div>

          <div>
            <h3>{stats.brands}</h3>
            <p>Total Brands</p>
          </div>
        </Link>

        <Link to="/categories" className="stats-card">
          <div className="stats-icon">
            <FaLayerGroup />
          </div>

          <div>
            <h3>{stats.categories}</h3>
            <p>Total Categories</p>
          </div>
        </Link>
      </div>

      {/* RECENT PRODUCTS */}

      <div className="recent-products">
        <div className="section-header">
          <h2>Recent Products</h2>

          <Link to="/products" className="view-all">
            View All
          </Link>
        </div>

        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Brand</th>
                <th>Category</th>
              </tr>
            </thead>

            <tbody>
              {recentProducts.length === 0 && (
                <tr>
                  <td colSpan="3" className="empty-row">
                    No recent products found!
                  </td>
                </tr>
              )}

              {recentProducts.map((p) => (
                <tr key={p._id}>
                  <td className="product-name">
                    {p.images?.length > 0 && (
                      <img src={p.images[0]} alt="" className="product-thumb" />
                    )}

                    {p.name}
                  </td>

                  <td>{p.brand?.name}</td>

                  <td>{p.category?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
