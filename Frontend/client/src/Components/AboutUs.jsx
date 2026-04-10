import React from 'react';
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();
  return (
    <div className="about-page">
      <div className="about-hero d-flex align-items-center justify-content-center text-center text-white">
        <div className="container py-5">
          <h1 className="display-4 fw-bold mb-4 animate-fade-in-up">About ShopSphere</h1>
          <p className="lead fw-light mb-5 animate-fade-in-up delay-1">
            We are redefining the e-commerce experience with speed, trust, and unmatched quality.
          </p>
        </div>
      </div>
      
      <div className="container py-5 my-4 bg-white rounded-4 shadow-sm p-4 px-md-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
              alt="Our Team" 
              className="img-fluid rounded-4 shadow interactive-card"
            />
          </div>
          <div className="col-lg-6">
            <h2 className="fw-bold mb-4">Who we are</h2>
            <p className="lead text-muted mb-4">
              ShopSphere was founded with a single powerful mission: to bridge the gap between premium quality and absolute user convenience. 
              We are a team of dedicated developers, designers, and retail experts who believe your shopping experience should be entirely frictionless.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <button className="btn btn-primary px-4 py-2 interactive-btn" onClick={() => navigate("/products")}>Explore Catalog</button>
              <button className="btn btn-outline-dark px-4 py-2 interactive-btn" onClick={() => navigate("/contact")}>Contact Leadership</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5 my-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 interactive-card p-4">
              <div className="card-body">
                <i className="bi bi-lightning-charge-fill display-4 text-warning mb-3"></i>
                <h3 className="fw-bold">Lightning Fast</h3>
                <p className="text-muted">Built on cutting-edge technologies to guarantee the fastest shopping experience possible.</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 interactive-card p-4">
              <div className="card-body">
                <i className="bi bi-shield-check display-4 text-success mb-3"></i>
                <h3 className="fw-bold">Secure Checkout</h3>
                <p className="text-muted">Your data is safe with us. We use industry-standard encryption for all transactions.</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 interactive-card p-4">
              <div className="card-body">
                <i className="bi bi-heart-fill display-4 text-danger mb-3"></i>
                <h3 className="fw-bold">Customer First</h3>
                <p className="text-muted">We pride ourselves on providing 24/7 world-class support for our loyal customers.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-5 pt-4">
          <button className="btn btn-primary btn-lg interactive-btn px-5 py-3" onClick={() => navigate('/contact')}>
            Get In Touch With Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
