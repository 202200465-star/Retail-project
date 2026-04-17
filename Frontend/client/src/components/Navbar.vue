<script setup>
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'
import { getImageUrl } from '../services/api'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark shadow-sm" style="background-color: #0f172a;">
    <div class="container">
      <router-link class="navbar-brand text-decoration-none text-white fw-bold fs-4 p-0" to="/">ShopSphere</router-link>

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

          <router-link class="btn btn-outline-info d-flex align-items-center gap-2 px-3 py-1 me-2" to="/profile">
            <img 
              :src="getImageUrl(authStore.user.profilePhoto || '/uploads/default.png')"
              alt="Profile" 
              class="rounded-circle object-fit-cover" 
              style="width: 30px; height: 30px" 
            />
            <span class="fw-semibold">{{ authStore.user.name }}</span>
          </router-link>

          <router-link v-if="authStore.isAdmin" class="btn btn-success" to="/admin">Admin Dashboard</router-link>
          <button class="btn btn-danger" @click="handleLogout">Logout</button>
        </template>
      </div>
    </div>
  </nav>
</template>
