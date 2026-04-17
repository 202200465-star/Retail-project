<script setup>
</script>

<template>
  <div class="contact-wrapper bg-light min-vh-100 py-5">
    <div class="container py-5">
      <div class="row align-items-center g-5">
        
        <!-- Contact Information Side -->
        <div class="col-lg-5 mb-5 mb-lg-0">
          <h6 class="text-primary fw-bold text-uppercase tracking-wider mb-2">Get in Touch</h6>
          <h1 class="display-4 fw-bolder mb-4">Let's Build Something Great.</h1>
          <p class="lead text-muted mb-5">
            Whether you have a question about the Vue.js architecture, want to report a system anomaly, or just want to chat about e-commerce structure, our inbox is open.
          </p>

          <div class="d-flex align-items-center mb-4 contact-item p-3 rounded-4 shadow-sm bg-white">
            <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-4" style="width: 50px; height: 50px;">
              <i class="bi bi-geo-alt-fill fs-5"></i>
            </div>
            <div>
              <h6 class="fw-bold m-0">Headquarters</h6>
              <span class="text-muted small">Computer Science Labs, Area 51</span>
            </div>
          </div>

          <div class="d-flex align-items-center mb-4 contact-item p-3 rounded-4 shadow-sm bg-white">
            <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-4" style="width: 50px; height: 50px;">
              <i class="bi bi-envelope-fill fs-5"></i>
            </div>
            <div>
              <h6 class="fw-bold m-0">Email Support</h6>
              <span class="text-muted small">sysadmin@shopsphere.dev</span>
            </div>
          </div>

          <div class="d-flex align-items-center contact-item p-3 rounded-4 shadow-sm bg-white">
            <div class="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center me-4" style="width: 50px; height: 50px;">
              <i class="bi bi-telephone-fill fs-5"></i>
            </div>
            <div>
              <h6 class="fw-bold m-0">System Hotline</h6>
              <span class="text-muted small">+1 (555) 019-2026</span>
            </div>
          </div>
        </div>

        <!-- Form Side -->
        <div class="col-lg-7">
          <div class="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div class="card-header bg-dark text-white p-4 text-center border-0">
              <h4 class="fw-bold m-0">Send a Message</h4>
            </div>
            <div class="card-body p-5">
              <form @submit.prevent="() => alert('Message transmitted successfully!')">
                <div class="row g-3">
                  <div class="col-md-6 mb-3">
                    <label class="form-label fw-bold small text-muted">First Name</label>
                    <input type="text" class="form-control form-control-lg bg-light border-0 px-3 py-2" placeholder="Jane" required>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label fw-bold small text-muted">Last Name</label>
                    <input type="text" class="form-control form-control-lg bg-light border-0 px-3 py-2" placeholder="Doe" required>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label fw-bold small text-muted">Email Address</label>
                  <input type="email" class="form-control form-control-lg bg-light border-0 px-3 py-2" placeholder="jane@example.com" required>
                </div>

                <div class="mb-4">
                  <label class="form-label fw-bold small text-muted">Message</label>
                  <textarea class="form-control form-control-lg bg-light border-0 px-3 py-2" rows="5" placeholder="How can we help?" required></textarea>
                </div>

                <button class="btn btn-primary btn-lg w-100 fw-bold py-3 shadow-sm hover-lift" type="submit">
                  <i class="bi bi-send-fill me-2"></i> Transmit Request
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.tracking-wider {
  letter-spacing: 0.1em;
}
.contact-item {
  transition: transform 0.3s ease;
}
.contact-item:hover {
  transform: translateX(10px);
}
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(13, 110, 253, 0.2) !important;
}
.form-control:focus {
  background-color: white !important;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1);
}
</style>
