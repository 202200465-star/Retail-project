import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import ProductCard from "./ProductCard";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(API_URL);
        setProducts(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-5 products-page-bg">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5">Our Products</h2>
          <p className="text-muted">
            Browse our catalog and enjoy a colorful shopping experience.
          </p>
        </div>

        {loading && <div className="alert alert-info">Loading products...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && products.length === 0 && (
          <div className="alert alert-warning">No products found.</div>
        )}

        <div className="row g-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsPage;