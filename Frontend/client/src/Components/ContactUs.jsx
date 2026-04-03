import React, { useState } from 'react';

function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
      e.target.reset();
    }, 2000);
  };

  return (
    <div className="contact-page bg-light py-5">
      <div className="container py-4">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold text-dark mb-3">Contact Us</h2>
          <p className="lead text-muted">Have any questions? We'd love to hear from you.</p>
        </div>

        <div className="row g-5 align-items-center bg-white p-4 shadow-sm rounded-4">
          <div className="col-lg-6">
            <h3 className="fw-bold mb-4">Send us a Message</h3>
            
            {success && (
              <div className="alert alert-success fw-semibold animate-fade-in">
                Thank you! Your message has been successfully sent.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="interactive-form">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="nameInput" placeholder="John Doe" required />
                <label htmlFor="nameInput">Full Name</label>
              </div>
              
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="emailInput" placeholder="name@example.com" required />
                <label htmlFor="emailInput">Email address</label>
              </div>
              
              <div className="form-floating mb-4">
                <textarea className="form-control" placeholder="Leave a message here" id="messageInput" style={{ height: "150px" }} required></textarea>
                <label htmlFor="messageInput">Your Message</label>
              </div>
              
              <button type="submit" className="btn btn-primary btn-lg w-100 interactive-btn" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          
          <div className="col-lg-6">
            <div className="map-container rounded-4 overflow-hidden shadow-sm border interactive-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.82794017772!2d31.18842323789063!3d30.05934500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1703248698539!5m2!1sen!2seg" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
            
            <div className="d-flex justify-content-between mt-4 text-center px-1 flex-wrap gap-2">
              <div>
                <h5 className="fw-bold mb-1">📍 Address</h5>
                <p className="text-muted mb-0 small">Downtown Cairo, Egypt</p>
              </div>
              <div>
                <h5 className="fw-bold mb-1">📞 Phone</h5>
                <p className="text-muted mb-0 small">+20 123 456 7890</p>
              </div>
              <div>
                <h5 className="fw-bold mb-1">✉️ Email</h5>
                <p className="text-muted mb-0 small">support@shopsphere.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
