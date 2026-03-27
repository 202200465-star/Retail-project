import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000/api/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);

        // IMPORTANT
        setProducts(response.data.data);

      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
            <div className="col-md-4" key={p._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="badge bg-primary mb-2">API</div>
                  <h5 className="fw-bold">{p.name}</h5>
                  <p className="text-muted mb-3">
                    Product loaded from backend.
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">{p.price} EGP</span>
                    <button className="btn btn-sm btn-success">
                      Add to Cart
                    </button>
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
// import { useEffect, useState } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:5000/api/products";

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(API_URL);
//       setProducts(response.data.data || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       alert("Failed to fetch products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <p className="text-center">Loading products...</p>;
//   }

//   return (
//     <div className="product-list-section">
//       <h2>Products List</h2>

//       {products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <div className="products-grid">
//           {products.map((product) => (
//             <div className="product-card" key={product._id}>
//               <h3>{product.name}</h3>
//               <p>
//                 <strong>ID:</strong> {product._id}
//               </p>
//               <p>
//                 <strong>Price:</strong> {product.price}
//               </p>
//               <p>
//                 <strong>Category:</strong> {product.category}
//               </p>
//               <p>
//                 <strong>Description:</strong> {product.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductList;


// function ProductList({ products, onEdit, onDelete }) {
//   return (
//     <div className="product-list-section">
//       <h2>Products List</h2>

//       {products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <div className="products-grid">
//           {products.map((product) => (
//             <div className="product-card" key={product._id}>
//               <h3>{product.name}</h3>
//               <p><strong>ID:</strong> {product._id}</p>
//               <p><strong>Price:</strong> {product.price}</p>
//               <p><strong>Category:</strong> {product.category}</p>
//               <p><strong>Description:</strong> {product.description}</p>

//               <div className="product-card-buttons">
//                 <button
//                   onClick={() => onEdit(product)}
//                   className="product-edit-btn"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => onDelete(product._id)}
//                   className="product-delete-btn"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductList;