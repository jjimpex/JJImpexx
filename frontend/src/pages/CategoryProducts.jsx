import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";
import api from "../services/api";
import "../styles/categoryProducts.css";

export default function CategoryProducts() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL params
  const brandFilter = searchParams.get("brand") || "";
  const sort = searchParams.get("sort") || "";
  const search = searchParams.get("search") || "";

  // Local input state (for debounce)
  const [searchInput, setSearchInput] = useState(search);

  // Sync URL → input
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams(
        (prev) => {
          const params = Object.fromEntries(prev);

          if (searchInput && searchInput.length >= 3) {
            params.search = searchInput;
          } else {
            delete params.search;
          }

          return params;
        },
        { replace: true },
      ); 
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, setSearchParams]);

  // Fetch products
  useEffect(() => {
    setLoading(true);

    const params = {};
    if (brandFilter) params.brand = brandFilter;
    if (sort) params.sort = sort;
    if (search) params.search = search;

    api
      .get(`/categories/${slug}/products`, { params })
      .then((res) => {
        setCategory(res.data.category);
        setProducts(res.data.products);

        const uniqueBrands = [];
        res.data.products.forEach((p) => {
          if (p.brand && !uniqueBrands.find((b) => b._id === p.brand._id)) {
            uniqueBrands.push(p.brand);
          }
        });
        setBrands(uniqueBrands);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug, brandFilter, sort, search]);

  const updateParam = (key, value) => {
    setSearchParams(
      (prev) => {
        const params = Object.fromEntries(prev);
        if (value) params[key] = value;
        else delete params[key];
        return params;
      },
      { replace: true },
    );
  };

  const resetFilters = () => {
    setSearchParams({}, { replace: true });
  };

  return (
    <section className="category-products-page">
      {loading ? (
        <div className="loading">Loading products…</div>
      ) : (
        <>
          <h1 className="category-title">{category?.name}</h1>

          {/* FILTER BAR */}
          <div className="filter-bar">
            <input
              type="text"
              placeholder="Search products"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <select
              value={brandFilter}
              onChange={(e) => updateParam("brand", e.target.value)}
            >
              <option value="">All Brands</option>
              {brands.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
            >
              <option value="">Sort</option>
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
            </select>

            <button
              className="reset-btn"
              onClick={resetFilters}
              title="Reset filters"
            >
              <FiRefreshCw size={18} />
            </button>
          </div>

          {/* PRODUCTS */}
          {products.length === 0 ? (
            <p className="empty-text">No products found.</p>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div className="product-card" key={product._id}>
                  <div className="product-image">
                    <img src={product.images?.[0]} alt={product.name} />
                  </div>

                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <span className="brand">{product.brand?.name}</span>
                    <span className="price">₹{product.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
