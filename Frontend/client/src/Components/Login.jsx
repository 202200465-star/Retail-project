function LandingPage({ setPage }) {
  return (
    <div className="landing-hero d-flex align-items-center">
      <div className="container text-center text-white">
        <h1 className="display-3 fw-bold mb-3">Welcome to ShopSphere</h1>
        <p className="lead mb-4">
          Explore products, enjoy a clean shopping experience, and manage inventory securely.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button className="btn btn-lg btn-warning px-4" onClick={() => setPage("products")}>
            View Products
          </button>
          <button className="btn btn-lg btn-light px-4" onClick={() => setPage("login")}>
            Login
          </button>
          <button className="btn btn-lg btn-outline-light px-4" onClick={() => setPage("register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;