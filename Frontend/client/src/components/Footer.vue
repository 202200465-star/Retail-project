<template>
  <footer class="footer-section text-white pt-5 pb-4">
    <div class="container">
      <div class="row g-4">
        <div class="col-md-4">
          <h4 class="fw-bold mb-3">Digital Retail</h4>
          <p class="text-white-50">
            A modern e-commerce platform for secure shopping, fast delivery, and reliable customer service.
          </p>
        </div>

        <div class="col-md-2">
          <h6 class="fw-bold mb-3">Quick Links</h6>
          <ul class="footer-links list-unstyled">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/products">Products</router-link></li>
            <li><router-link to="/cart">Cart</router-link></li>
            <li><router-link to="/orders">Orders</router-link></li>
          </ul>
        </div>

        <div class="col-md-3">
          <h6 class="fw-bold mb-3">Customer Service</h6>
          <ul class="footer-links list-unstyled">
            <li><router-link to="/contact">Contact Us</router-link></li>
            <li><a href="#">Shipping Information</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">Payment Methods</a></li>
          </ul>
        </div>

        <div class="col-md-3">
            <h6 class="fw-bold mb-3">Contact</h6>
            <p class="text-white-50 mb-2">
              <i class="bi bi-envelope me-2"></i>
              support@example.com
            </p>
            <p class="text-white-50 mb-2">
              <i class="bi bi-telephone me-2"></i>
              +20 100 000 0000
            </p>
            <div class="d-flex gap-3 mt-3 social-icons">
              <i class="bi bi-facebook"></i>
              <i class="bi bi-instagram"></i>
              <i class="bi bi-twitter-x"></i>
              <i class="bi bi-linkedin"></i>
            </div>
          </div>
        
      </div>

      <hr class="border-secondary my-4">

      <div class="text-center text-white-50 small">
        © 2026 Digital Retail. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-section {
  background: #0f172a;
}

.footer-links li {
  margin-bottom: 0.7rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #ffc107;
}

.social-icons i {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffc107;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-icons i:hover {
  background: #ffc107;
  color: #0f172a;
  transform: translateY(-3px);
}
</style>