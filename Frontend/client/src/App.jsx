import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./Components/Navbar";
import LandingPage from "./Components/LandingPage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProductsPage from "./Components/ProductsPage";
import AdminDashboard from "./Components/AdminDashboard";
import Profile from "./Components/Profile";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import { CartProvider } from "./context/CartContext";
import CartSidebar from "./Components/CartSidebar";

function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AdminRoute({ user, children }) {
  if (!user || user.role !== "admin") return <Navigate to="/products" replace />;
  return children;
}

export default function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar user={user} handleLogout={handleLogout} setIsCartOpen={setIsCartOpen} />
          <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute user={user}>
                  <Profile user={user} setUser={setUser} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <AdminRoute user={user}>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}


