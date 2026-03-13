import { useEffect, useState } from "react";
import LandingPage from "./Components/LandingPage";
import ProductsList from "./Components/ProductsList";
import ProductForm from "./Components/ProductForm";
import ProductList from "./Components/ProductList";
import "./App.css";

const API_URL = "http://localhost:5000/api/products";

export default function App() {
  
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setProducts(result.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (productData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
      });

      const result = await response.json();
      alert(result.message);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
      });

      const result = await response.json();
      alert(result.message);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const result = await response.json();
      alert(result.message);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSubmit = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
  };

  return (
    <div className="app-container">
      <LandingPage />
      {/* <ProductsList /> */}
      <h1 className="text-center mt-3">Product Management</h1>

      <ProductForm
        onSubmit={handleSubmit}
        editingProduct={editingProduct}
        cancelEdit={() => setEditingProduct(null)}
      />

      <ProductList
        products={products}
        onEdit={setEditingProduct}
        onDelete={deleteProduct}
      />
    </div>
  );
}


