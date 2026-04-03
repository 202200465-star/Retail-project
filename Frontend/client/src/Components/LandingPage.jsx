import React from 'react';

function LandingPage({ setPage }) {
  return (
    <div className="landing-page-wrapper">
      {/* Hero Section */}
      <div className="landing-hero d-flex align-items-center">
        <div className="container text-center text-white">
          <h1 className="display-2 fw-bold mb-3 animate-fade-in-up">Welcome to ShopSphere</h1>
          <p className="lead mb-5 animate-fade-in-up delay-1">
            Discover a curated collection of premium products and elevate your lifestyle.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap mt-4 animate-fade-in-up delay-1">
            <button className="btn btn-lg btn-warning px-5 shadow-sm interactive-btn fw-bold" onClick={() => setPage("products")}>
              Shop Now
            </button>
            <button className="btn btn-lg btn-outline-light px-5 shadow-sm interactive-btn fw-bold" onClick={() => setPage("about")}>
              Our Story
            </button>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-5 text-dark">Shop by Category</h2>
            <div className="mx-auto mt-2 bg-primary" style={{ height: "4px", width: "60px", borderRadius: "2px" }}></div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div 
                className="card border-0 rounded-4 overflow-hidden text-white interactive-card shadow-sm position-relative"
                style={{ height: "300px", background: "url('https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80') center/cover" }}
                onClick={() => setPage("products")}
              >
                <div className="position-absolute w-100 h-100 bg-dark" style={{ opacity: 0.4 }}></div>
                <div className="position-relative z-1 d-flex flex-column justify-content-end h-100 p-4">
                  <h3 className="fw-bold m-0">Electronics</h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div 
                className="card border-0 rounded-4 overflow-hidden text-white interactive-card shadow-sm position-relative"
                style={{ height: "300px", background: "url('https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80') center/cover" }}
                onClick={() => setPage("products")}
              >
                <div className="position-absolute w-100 h-100 bg-dark" style={{ opacity: 0.4 }}></div>
                <div className="position-relative z-1 d-flex flex-column justify-content-end h-100 p-4">
                  <h3 className="fw-bold m-0">Fashion</h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div 
                className="card border-0 rounded-4 overflow-hidden text-white interactive-card shadow-sm position-relative"
                style={{ height: "300px", background: "url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80') center/cover" }}
                onClick={() => setPage("products")}
              >
                <div className="position-absolute w-100 h-100 bg-dark" style={{ opacity: 0.4 }}></div>
                <div className="position-relative z-1 d-flex flex-column justify-content-end h-100 p-4">
                  <h3 className="fw-bold m-0">Home Goods</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-5 bg-light">
        <div className="container py-4 text-center">
          <div className="row g-4">
            <div className="col-md-4">
              <i className="bi bi-truck display-4 text-primary mb-3 d-block animate-fade-in-up"></i>
              <h4 className="fw-bold">Free Shipping</h4>
              <p className="text-muted">On all orders over 500 EGP.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-arrow-return-left display-4 text-primary mb-3 d-block animate-fade-in-up delay-1"></i>
              <h4 className="fw-bold">Easy Returns</h4>
              <p className="text-muted">30-day hassle-free return policy.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-shield-lock display-4 text-primary mb-3 d-block animate-fade-in-up delay-1"></i>
              <h4 className="fw-bold">Secure Payment</h4>
              <p className="text-muted">100% secure standard encryption.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 text-white text-center" style={{ background: "#0f172a" }}>
        <div className="container py-5">
          <h2 className="fw-bold mb-3 display-6">Stay strictly in the loop</h2>
          <p className="lead text-white-50 mb-5">Subscribe to receive exclusive deals and latest product news right to your inbox.</p>
          <div className="mx-auto d-flex gap-2" style={{ maxWidth: "500px" }}>
            <input type="email" className="form-control form-control-lg" placeholder="Enter your email address" />
            <button className="btn btn-primary btn-lg px-4 interactive-btn">Subscribe</button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default LandingPage;