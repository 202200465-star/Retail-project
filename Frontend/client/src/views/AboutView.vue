<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="about-wrapper bg-light">
    <!-- About Hero -->
    <div class="about-hero position-relative py-5 text-center text-white" style="background-color: #0f172a; overflow: hidden;">
      <div class="container position-relative z-1 py-5 my-5">
        <h6 class="text-warning fw-bold tracking-widest text-uppercase mb-3">Our Mission</h6>
        <h1 class="display-4 fw-bolder mb-4">Engineering The Future of Retail</h1>
        <p class="lead opacity-75 mx-auto" style="max-width: 700px;">
          ShopSphere started with a unified goal: To tear off the archaic layers of typical online shopping, and build a blazing fast user experience using Lab 6 standardized Vue.js architecture.
        </p>
      </div>
      <!-- Background Abstract Shape -->
      <div class="position-absolute bg-primary rounded-circle blur-circle" style="width: 400px; height: 400px; top: -100px; left: -100px; opacity: 0.2; filter: blur(80px);"></div>
      <div class="position-absolute bg-warning rounded-circle blur-circle" style="width: 300px; height: 300px; bottom: -50px; right: -50px; opacity: 0.15; filter: blur(60px);"></div>
    </div>

    <!-- Stats & Story -->
    <div class="container py-5 mt-n5 position-relative z-2">
      <div class="row g-4 justify-content-center">
        <!-- Story Panel -->
        <div class="col-lg-8 mb-5">
          <div class="card shadow-lg border-0 rounded-4 p-5 glass-card">
            <h3 class="fw-bold mb-4">Why We Built This</h3>
            <p class="text-muted fs-5 lh-lg mb-4">
              Traditional e-commerce platforms suffer from clunky state management and brutal load times. When tasked with modernizing a digital storefront, we chose <strong>Vue 3</strong> combined with the speed of <strong>Vite</strong> and <strong>Pinia</strong>. 
            </p>
            <p class="text-muted fs-5 lh-lg m-0">
              By abstracting our codebase into robust <code>/services</code> and implementing an enterprise-level routing suite, we ensure that every product you load, cart you update, and order you process resolves securely in mere milliseconds.
            </p>
          </div>
        </div>
      </div>

      <!-- Analytics Cards -->
      <div class="row g-4 text-center mt-2">
        <div class="col-md-4">
          <div class="card shadow-sm border-0 py-5 rounded-4 hover-lift">
            <i class="bi bi-lightning-charge display-4 text-warning mb-3"></i>
            <h2 class="fw-bolder m-0">0.4s</h2>
            <p class="text-muted m-0 text-uppercase tracking-wider small fw-bold">Page Load Resolution</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card shadow-sm border-0 py-5 rounded-4 hover-lift">
            <i class="bi bi-shield-check display-4 text-success mb-3"></i>
            <h2 class="fw-bolder m-0">100%</h2>
            <p class="text-muted m-0 text-uppercase tracking-wider small fw-bold">Guarded API Protection</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card shadow-sm border-0 py-5 rounded-4 hover-lift">
            <i class="bi bi-box-seam display-4 text-primary mb-3"></i>
            <h2 class="fw-bolder m-0">Infinite</h2>
            <p class="text-muted m-0 text-uppercase tracking-wider small fw-bold">Dynamic Component Scaling</p>
          </div>
        </div>
      </div>

      <div class="text-center mt-5 pt-4 pb-3">
        <button class="btn btn-primary btn-lg px-5 py-3 shadow-sm rounded-pill fw-bold" @click="router.push('/products')">
          Explore The Result
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tracking-widest {
  letter-spacing: 0.15em;
}
.tracking-wider {
  letter-spacing: 0.05em;
}
.glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}
.mt-n5 {
  margin-top: -80px;
}
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important;
}
</style>
