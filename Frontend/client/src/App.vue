<script setup>
import Navbar from './components/Navbar.vue'
import CartSidebar from './components/CartSidebar.vue'
import Footer from './components/Footer.vue'

</script>

<template>
  <div class="app-shell">
    <Navbar />
    <CartSidebar />
    <router-view />
    <Footer />
  </div>
</template>
