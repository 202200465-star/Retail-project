import { useEffect, useState } from "react";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => {
        if (!r.ok) throw new Error(`API error: ${r.status}`);
        return r.json();
      })
      .then((data) => setProducts(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-light py-5" id="products-api">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold mb-0">Products (From API)</h2>
          <span className="badge text-bg-dark">/api/products</span>
        </div>

        {loading && <div className="alert alert-info">Loading products...</div>}
        {error && <div className="alert alert-danger">❌ {error}</div>}

        {!loading && !error && products.length === 0 && (
          <div className="alert alert-warning">No products found.</div>
        )}

        <div className="row g-4">
          {products.map((p) => (
            <div className="col-md-4" key={p.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="badge bg-primary mb-2">API</div>
                  <h5 className="fw-bold">{p.name}</h5>
                  <p className="text-muted mb-3">Product loaded from backend.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">{p.price} EGP</span>
                    <button className="btn btn-sm btn-success">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}