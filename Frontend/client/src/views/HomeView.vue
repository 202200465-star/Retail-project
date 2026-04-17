<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="home-wrapper">
    <!-- Hero Section -->
    <header class="hero-section d-flex align-items-center position-relative overflow-hidden w-100">
      <div class="position-absolute w-100 h-100 bg-overlay"></div>
      <div class="container position-relative z-1 text-center text-white hero-content">
        <h1 class="display-3 fw-bolder mb-3 animate-fade-in-up">Redefining Digital Retail</h1>
        <p class="lead mb-5 animate-fade-in-up delay-1 opacity-75 mx-auto" style="max-width: 600px;">
          Experience a revolutionary shopping journey. Hand-selected premium inventory built natively on the fastest VueJS architectural standards.
        </p>
        <div class="d-flex justify-content-center gap-3 animate-fade-in-up delay-2">
          <button class="btn btn-warning btn-lg px-5 py-3 fw-bold rounded-pill shadow-lg hero-btn" @click="router.push('/products')">
            <i class="bi bi-bag-check-fill me-2"></i> Shop Collection
          </button>
          <button class="btn btn-outline-light btn-lg px-5 py-3 fw-bold rounded-pill hero-btn-outline" @click="router.push('/about')">
            Our Story
          </button>
        </div>
      </div>
    </header>

    <!-- Category Highlights -->
    <section class="py-5 bg-light">
      <div class="container py-5">
        <div class="text-center mb-5">
          <h6 class="text-primary fw-bold text-uppercase tracking-wider">Curated Selections</h6>
          <h2 class="fw-bolder display-6">Featured Collections</h2>
        </div>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card category-card border-0 rounded-4 overflow-hidden shadow-sm" @click="router.push('/products')">
              <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80" class="card-img" alt="Tech" style="height: 300px; object-fit: cover;">
              <div class="card-img-overlay d-flex flex-column justify-content-end bg-gradient-dark">
                <h4 class="card-title text-white fw-bold m-0">Advanced Tech</h4>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card category-card border-0 rounded-4 overflow-hidden shadow-sm" @click="router.push('/products')">
              <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80" class="card-img" alt="Fashion" style="height: 300px; object-fit: cover;">
              <div class="card-img-overlay d-flex flex-column justify-content-end bg-gradient-dark">
                <h4 class="card-title text-white fw-bold m-0">Apparel Design</h4>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card category-card border-0 rounded-4 overflow-hidden shadow-sm" @click="router.push('/products')">
              <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80" class="card-img" alt="Home" style="height: 300px; object-fit: cover;">
              <div class="card-img-overlay d-flex flex-column justify-content-end bg-gradient-dark">
                <h4 class="card-title text-white fw-bold m-0">Minimalist Home</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  min-height: calc(100vh - 70px);
  background: url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;
  background-attachment: fixed;
  padding: 0;
  margin: 0;
}
.bg-overlay {
  background: linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.4) 100%);
}
.tracking-wider {
  letter-spacing: 0.1em;
}
.bg-gradient-dark {
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
}

.category-card {
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;
}
.category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
}
.category-card img {
  transition: transform 0.6s ease;
}
.category-card:hover img {
  transform: scale(1.05);
}

.hero-btn, .hero-btn-outline {
  transition: all 0.3s ease;
}
.hero-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(255,193,7,0.3) !important;
}
.hero-btn-outline:hover {
  background-color: white;
  color: #0f172a;
  transform: translateY(-3px);
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s forwards;
  opacity: 0;
  transform: translateY(20px);
}
.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
