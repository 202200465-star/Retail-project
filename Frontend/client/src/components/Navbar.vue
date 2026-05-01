<script setup>
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'
import { getImageUrl } from '../services/api'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()
const dropdownOpen = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark shadow-sm" style="background-color: #0f172a;">
    <div class="container">
      <router-link class="navbar-brand text-decoration-none text-white fw-bold fs-4 p-0 d-flex align-items-center" to="/">
        <i class="bi bi-hexagon-half text-warning fs-3 me-2"></i> ShopSphere
      </router-link>

      <div class="ms-auto d-flex gap-2 flex-wrap align-items-center">
        <router-link class="btn btn-outline-light" to="/">Home</router-link>
        <router-link class="btn btn-outline-light" to="/products">Products</router-link>
        <router-link class="btn btn-outline-light" to="/about">About Us</router-link>
        <router-link class="btn btn-outline-light" to="/contact">Contact Us</router-link>

        <template v-if="!authStore.isAuthenticated">
          <router-link class="btn btn-warning" to="/login">Login</router-link>
          <router-link class="btn btn-light" to="/register">Register</router-link>
        </template>

        <template v-else>
          <button class="btn btn-outline-light position-relative mx-2" @click="cartStore.toggleSidebar()">
            <i class="bi bi-cart"></i> Cart
            <span v-if="cartStore.totalItems > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white">
              {{ cartStore.totalItems }}
            </span>
          </button>

          <!-- Backdrop for closing dropdown -->
          <div v-if="dropdownOpen" class="position-fixed top-0 start-0 w-100 h-100 z-1" @click="dropdownOpen = false" style="z-index: 1040;"></div>
          
          <div class="position-relative ms-2" style="z-index: 1050;">
            <button 
              class="btn btn-outline-info d-flex align-items-center gap-2 px-3 py-1 dropdown-toggle" 
              @click="dropdownOpen = !dropdownOpen"
            >
              <img 
                :src="getImageUrl(authStore.user.profilePhoto || '/uploads/default.png')"
                alt="Profile" 
                class="rounded-circle object-fit-cover" 
                style="width: 30px; height: 30px" 
              />
              <span class="fw-semibold">{{ authStore.user.name }}</span>
            </button>
            
            <!-- Custom Dropdown Menu -->
            <ul v-if="dropdownOpen" class="dropdown-menu dropdown-menu-end show shadow-lg position-absolute mt-2 border-0 rounded-3 p-2" style="right: 0; min-width: 250px;">
              <li>
                <div class="px-3 py-2 text-muted small fw-bold text-uppercase">Account Security</div>
              </li>
              <li>
                <router-link class="dropdown-item py-2 rounded-2 fw-semibold" to="/profile" @click="dropdownOpen = false">
                  <i class="bi bi-person-circle me-2 text-primary"></i> Profile Settings
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item py-2 rounded-2 fw-semibold" to="/my-orders" @click="dropdownOpen = false">
                  <i class="bi bi-bag-check me-2 text-warning"></i> My Orders
                </router-link>
              </li>
              
              <template v-if="authStore.isAdmin">
                <li><hr class="dropdown-divider my-2"></li>
                <li>
                  <div class="px-3 py-1 text-muted small fw-bold text-uppercase">Management</div>
                </li>
                <li>
                  <router-link class="dropdown-item py-2 rounded-2 fw-semibold text-success" to="/admin" @click="dropdownOpen = false">
                    <i class="bi bi-shield-lock-fill me-2"></i> Admin Dashboard
                  </router-link>
                </li>
              </template>
              
              <li><hr class="dropdown-divider my-2"></li>
              <li>
                <button class="dropdown-item py-2 rounded-2 fw-bold text-danger dropdown-btn w-100 text-start" @click="handleLogout">
                  <i class="bi bi-box-arrow-right me-2"></i> Secure Logout
                </button>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>
