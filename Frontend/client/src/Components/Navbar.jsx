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