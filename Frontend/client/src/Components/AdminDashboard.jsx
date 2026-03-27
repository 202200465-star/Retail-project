import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const API_URL = "http://localhost:5000/api/products";

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data.data || []);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (productData) => {
    try {
      const response = await axios.post(API_URL, productData, authConfig);
      alert(response.data.message);
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Error adding product");
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, productData, authConfig);
      alert(response.data.message);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Error updating product");
    }
  };

  const deleteProduct = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const response = await axios.delete(`${API_URL}/${id}`, authConfig);
      alert(response.data.message);
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting product");
    }
  };

  const handleSubmit = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct._id, productData);
    } else {
      addProduct(productData);
    }
  };

  return (
    <section className="py-5 admin-page-bg">
      <div className="container">
        <div className="mb-4 text-center">
          <h2 className="fw-bold display-5 text-white">Admin Dashboard</h2>
          <p className="text-light">
            Manage product catalog with full CRUD operations.
          </p>
        </div>

        <ProductForm
          onSubmit={handleSubmit}
          editingProduct={editingProduct}
          cancelEdit={() => setEditingProduct(null)}
        />

        <div className="row g-4">
          {products.map((product) => (
            <div className="col-md-6 col-lg-4" key={product._id}>
              <div className="card h-100 shadow border-0">
                <div className="card-body">
                  <span className="badge bg-warning text-dark mb-2">
                    {product.category}
                  </span>
                  <h5 className="fw-bold">{product.name}</h5>
                  <p className="text-muted">{product.description}</p>
                  <p className="fw-bold text-success">{product.price} EGP</p>
                </div>

                <div className="card-footer bg-white border-0 d-flex gap-2">
                  <button
                    className="btn btn-outline-primary w-50"
                    onClick={() => setEditingProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger w-50"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import ProductForm from "./ProductForm";

// const API_URL = "http://localhost:5000/api/products";

// function AdminDashboard() {
//   const [products, setProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = user?.token;

//   const authConfig = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(API_URL);
//       setProducts(response.data.data || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       alert("Failed to fetch products");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const addProduct = async (productData) => {
//     try {
//       const response = await axios.post(API_URL, productData, authConfig);
//       alert(response.data.message);
//       fetchProducts();
//     } catch (error) {
//       alert(error.response?.data?.message || "Error adding product");
//     }
//   };

//   const updateProduct = async (id, productData) => {
//     try {
//       const response = await axios.put(
//         `${API_URL}/${id}`,
//         productData,
//         authConfig
//       );

//       alert(response.data.message);
//       setEditingProduct(null);
//       fetchProducts();
//     } catch (error) {
//       alert(error.response?.data?.message || "Error updating product");
//     }
//   };

//   const deleteProduct = async (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this product?"
//     );
//     if (!confirmed) return;

//     try {
//       const response = await axios.delete(`${API_URL}/${id}`, authConfig);
//       alert(response.data.message);
//       fetchProducts();
//     } catch (error) {
//       alert(error.response?.data?.message || "Error deleting product");
//     }
//   };

//   const handleSubmit = (productData) => {
//     if (editingProduct) {
//       updateProduct(editingProduct._id, productData);
//     } else {
//       addProduct(productData);
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1 className="text-center mt-3">Admin Product Management</h1>

//       <ProductForm
//         onSubmit={handleSubmit}
//         editingProduct={editingProduct}
//         cancelEdit={() => setEditingProduct(null)}
//       />

//       <div className="product-list-section">
//         <h2>Products List</h2>

//         {products.length === 0 ? (
//           <p>No products found.</p>
//         ) : (
//           <div className="products-grid">
//             {products.map((product) => (
//               <div className="product-card" key={product._id}>
//                 <h3>{product.name}</h3>
//                 <p>
//                   <strong>ID:</strong> {product._id}
//                 </p>
//                 <p>
//                   <strong>Price:</strong> {product.price}
//                 </p>
//                 <p>
//                   <strong>Category:</strong> {product.category}
//                 </p>
//                 <p>
//                   <strong>Description:</strong> {product.description}
//                 </p>

//                 <div className="product-card-buttons">
//                   <button
//                     onClick={() => setEditingProduct(product)}
//                     className="product-edit-btn"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => deleteProduct(product._id)}
//                     className="product-delete-btn"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;