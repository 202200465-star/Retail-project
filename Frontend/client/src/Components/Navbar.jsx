import { getImageUrl } from "../config/axiosInstance";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, handleLogout, setIsCartOpen }) {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleSignOut = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar shadow-sm">
      <div className="container">
        <Link className="navbar-brand text-decoration-none text-white fw-bold fs-4 p-0" to="/">
          ShopSphere
        </Link>

        <div className="ms-auto d-flex gap-2 flex-wrap align-items-center">
          <Link className="btn btn-outline-light" to="/">
            Home
          </Link>

          <Link className="btn btn-outline-light" to="/products">
            Products
          </Link>

          <Link className="btn btn-outline-light" to="/about">
            About Us
          </Link>

          <Link className="btn btn-outline-light" to="/contact">
            Contact Us
          </Link>

          {!user && (
            <>
              <Link className="btn btn-warning" to="/login">
                Login
              </Link>
              <Link className="btn btn-light" to="/register">
                Register
              </Link>
            </>
          )}

          {user && (
            <button className="btn btn-outline-light position-relative mx-2" onClick={() => setIsCartOpen(true)}>
              <i className="bi bi-cart"></i> Cart
              {cartItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white">
                  {cartItems.length}
                </span>
              )}
            </button>
          )}

          {user && (
            <Link 
              className="btn btn-outline-info d-flex align-items-center gap-2 px-3 py-1 me-2" 
              to="/profile"
            >
              <img 
                src={getImageUrl(user.profilePhoto || '/uploads/default.png')}
                alt="Profile" 
                className="rounded-circle object-fit-cover" 
                style={{ width: "30px", height: "30px" }} 
                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/30"; }}
              />
              <span className="fw-semibold">{user.name}</span>
            </Link>
          )}

          {user?.role === "admin" && (
            <Link className="btn btn-success" to="/admin">
              Admin Dashboard
            </Link>
          )}

          {user && (
            <button
              className="btn btn-danger"
              onClick={handleSignOut}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;