function Navbar({ user, setPage, handleLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar shadow-sm">
      <div className="container">
        <button
          className="navbar-brand btn btn-link text-decoration-none text-white fw-bold fs-4 p-0"
          onClick={() => setPage("landing")}
        >
          ShopSphere
        </button>

        <div className="ms-auto d-flex gap-2 flex-wrap">
          <button className="btn btn-outline-light" onClick={() => setPage("landing")}>
            Home
          </button>

          <button className="btn btn-outline-light" onClick={() => setPage("products")}>
            Products
          </button>

          <button className="btn btn-outline-light" onClick={() => setPage("about")}>
            About Us
          </button>

          <button className="btn btn-outline-light" onClick={() => setPage("contact")}>
            Contact Us
          </button>

          {!user && (
            <>
              <button className="btn btn-warning" onClick={() => setPage("login")}>
                Login
              </button>
              <button className="btn btn-light" onClick={() => setPage("register")}>
                Register
              </button>
            </>
          )}

          {user && (
            <button 
              className="btn btn-outline-info d-flex align-items-center gap-2 px-3 py-1" 
              onClick={() => setPage("profile")}
            >
              <img 
                src={user.profilePhoto?.startsWith('http') ? user.profilePhoto : `http://localhost:5000${user.profilePhoto || '/uploads/default.png'}`} 
                alt="Profile" 
                className="rounded-circle object-fit-cover" 
                style={{ width: "30px", height: "30px" }} 
                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/30"; }}
              />
              <span className="fw-semibold">{user.name}</span>
            </button>
          )}

          {user?.role === "admin" && (
            <button className="btn btn-success" onClick={() => setPage("admin")}>
              Admin Dashboard
            </button>
          )}

          {user && (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;