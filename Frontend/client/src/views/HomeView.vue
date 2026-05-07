<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const features = [
  {
    icon: 'bi-shield-lock-fill',
    title: 'Secure Payments',
    text: 'Shop safely with protected checkout and trusted payment processing.'
  },
  {
    icon: 'bi-truck',
    title: 'Fast Delivery',
    text: 'Get your orders delivered quickly with reliable shipping service.'
  },
  {
    icon: 'bi-gem',
    title: 'Premium Quality',
    text: 'Explore carefully selected products with excellent quality standards.'
  },
  {
    icon: 'bi-arrow-counterclockwise',
    title: 'Easy Returns',
    text: 'Simple and flexible return process for a better shopping experience.'
  }
]

const trustItems = [
  { number: '100%', label: 'Secure Checkout' },
  { number: '24/7', label: 'Customer Support' },
  { number: 'Fast', label: 'Order Tracking' },
  { number: 'Trusted', label: 'Shopping Experience' }
]
</script>

<template>
  <div class="home-wrapper">
    <!-- Hero Section -->
    <header class="hero-section d-flex align-items-center position-relative overflow-hidden w-100">
      <div class="position-absolute w-100 h-100 bg-overlay"></div>

      <div class="container position-relative z-1 text-center text-white hero-content">
        <h1 class="display-3 fw-bolder mb-3 animate-fade-in-up">
          Redefining Digital Retail
        </h1>

        <p
          class="lead mb-5 animate-fade-in-up delay-1 opacity-75 mx-auto"
          style="max-width: 650px;"
        >
          Experience a revolutionary shopping journey with premium products,
          secure checkout, fast delivery, and a modern e-commerce experience.
        </p>

        <div class="d-flex justify-content-center gap-3 flex-wrap animate-fade-in-up delay-2">
          <button
            class="btn btn-warning btn-lg px-5 py-3 fw-bold rounded-pill shadow-lg hero-btn"
            @click="router.push('/products')"
          >
            <i class="bi bi-bag-check-fill me-2"></i>
            Shop Collection
          </button>

          <button
            class="btn btn-outline-light btn-lg px-5 py-3 fw-bold rounded-pill hero-btn-outline"
            @click="router.push('/about')"
          >
            Our Story
          </button>
        </div>
      </div>
    </header>

    <!-- Category Highlights -->
    <section class="py-5 bg-light">
      <div class="container py-5">
        <div class="text-center mb-5">
          <h6 class="text-primary fw-bold text-uppercase tracking-wider">
            Curated Selections
          </h6>
          <h2 class="fw-bolder display-6">Featured Collections</h2>
          <p class="text-muted mt-3">
            Browse our most popular shopping categories.
          </p>
        </div>

        <div class="row g-4">
          <div class="col-md-4">
            <div
              class="card category-card border-0 rounded-4 overflow-hidden shadow-sm"
              @click="router.push('/products')"
            >
              <img
                src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80"
                class="card-img"
                alt="Tech"
              >
              <div class="card-img-overlay d-flex flex-column justify-content-end bg-gradient-dark">
                <h4 class="card-title text-white fw-bold m-0">Advanced Tech</h4>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div
              class="card category-card border-0 rounded-4 overflow-hidden shadow-sm"
              @click="router.push('/products')"
            >
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80"
                class="card-img"
                alt="Fashion"
              >
              <div class="card-img-overlay d-flex flex-column justify-content-end bg-gradient-dark">
                <h4 class="card-title text-white fw-bold m-0">Apparel Design</h4>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div
              class="card category-card border-0 rounded-4 overflow-hidden shadow-sm"
              @click="router.push('/products')"
            >
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80"
                class="card-img"
                alt="Home"
              >
              <div class="card-img-overlay d-flex flex-column justify-content-end bg-gradient-dark">
                <h4 class="card-title text-white fw-bold m-0">Minimalist Home</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Shop With Us -->
    <section class="py-5 bg-white">
      <div class="container py-5">
        <div class="text-center mb-5">
          <h6 class="text-warning fw-bold text-uppercase tracking-wider">
            Why Choose Us
          </h6>
          <h2 class="fw-bolder display-6">Why Shop With Us?</h2>
          <p class="text-muted mt-3">
            We focus on trust, speed, quality, and customer satisfaction.
          </p>
        </div>

        <div class="row g-4">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="col-sm-6 col-lg-3"
          >
            <div class="feature-card h-100 text-center p-4 rounded-4 shadow-sm">
              <div class="feature-icon mx-auto mb-4">
                <i :class="`bi ${feature.icon}`"></i>
              </div>
              <h5 class="fw-bold mb-3">{{ feature.title }}</h5>
              <p class="text-muted small mb-0">
                {{ feature.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Section -->
    <section class="trust-section py-5 text-white">
      <div class="container py-5">
        <div class="row align-items-center g-5">
          <div class="col-lg-5">
            <h6 class="text-warning fw-bold text-uppercase tracking-wider">
              Trusted Experience
            </h6>
            <h2 class="fw-bolder display-6 mb-3">
              Built for a Better Shopping Journey
            </h2>
            <p class="opacity-75 mb-4">
              Our platform combines modern design, secure checkout,
              order tracking, and professional customer support to deliver
              a reliable e-commerce experience.
            </p>
            <button
              class="btn btn-warning rounded-pill px-4 py-2 fw-bold"
              @click="router.push('/products')"
            >
              Start Shopping
            </button>
          </div>

          <div class="col-lg-7">
            <div class="row g-4">
              <div
                v-for="item in trustItems"
                :key="item.label"
                class="col-sm-6"
              >
                <div class="trust-card p-4 rounded-4 h-100">
                  <h3 class="fw-bolder text-warning mb-2">{{ item.number }}</h3>
                  <p class="mb-0 opacity-75">{{ item.label }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-5 bg-light">
      <div class="container py-5">
        <div class="newsletter-box rounded-5 p-5 text-center text-white shadow-lg">
          <h2 class="fw-bolder mb-3">Stay Updated</h2>
          <p class="opacity-75 mb-4 mx-auto" style="max-width: 600px;">
            Subscribe to receive updates about new products, offers,
            and exclusive deals.
          </p>

          <form class="newsletter-form mx-auto d-flex gap-2 flex-column flex-md-row">
            <input
              type="email"
              class="form-control form-control-lg rounded-pill px-4"
              placeholder="Enter your email address"
            >
            <button
              type="button"
              class="btn btn-warning btn-lg rounded-pill px-5 fw-bold"
            >
              Subscribe
            </button>
          </form>
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
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.45) 100%);
}

.tracking-wider {
  letter-spacing: 0.1em;
}

.bg-gradient-dark {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.82) 0%, transparent 65%);
}

.category-card {
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;
}

.category-card img {
  height: 300px;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.category-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
}

.category-card:hover img {
  transform: scale(1.05);
}

.hero-btn,
.hero-btn-outline {
  transition: all 0.3s ease;
}

.hero-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(255, 193, 7, 0.3) !important;
}

.hero-btn-outline:hover {
  background-color: white;
  color: #0f172a;
  transform: translateY(-3px);
}

.feature-card {
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.12) !important;
}

.feature-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffc107, #ffda6a);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  font-size: 1.8rem;
}

.trust-section {
  background:
    linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.96)),
    url('https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;
}

.trust-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.trust-card:hover {
  transform: translateY(-6px);
  background: rgba(255, 255, 255, 0.12);
}

.newsletter-box {
  background:
    linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(37, 99, 235, 0.8)),
    url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat;
}

.newsletter-form {
  max-width: 700px;
}

.newsletter-form input {
  border: none;
  min-height: 55px;
}

.newsletter-form input:focus {
  box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.35);
}



.animate-fade-in-up {
  animation: fadeInUp 0.8s forwards;
  opacity: 0;
  transform: translateY(20px);
}

.delay-1 {
  animation-delay: 0.2s;
}

.delay-2 {
  animation-delay: 0.4s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-section {
    background-attachment: scroll;
    min-height: 85vh;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }

  .newsletter-box {
    padding: 2rem !important;
  }
}
</style>
