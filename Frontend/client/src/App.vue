<script setup>
import Navbar from './components/Navbar.vue'
import CartSidebar from './components/CartSidebar.vue'
</script>

<template>
  <div class="app-shell">
    <Navbar />
    <CartSidebar />
    <router-view />
  </div>
</template>
