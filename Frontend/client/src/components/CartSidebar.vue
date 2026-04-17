<script setup>
import { useCartStore } from '../stores/cartStore'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const checkout = () => {
  cartStore.toggleSidebar(false)
  router.push('/checkout')
}
</script>

<template>
  <div :class="['cart-sidebar', { open: cartStore.isOpen }]">
    <div class="cart-header bg-primary text-white p-3 d-flex justify-content-between align-items-center">
      <h5 class="m-0"><i class="bi bi-cart3 me-2"></i>Your Cart</h5>
      <button class="btn-close btn-close-white" @click="cartStore.toggleSidebar(false)"></button>
    </div>

    <div class="cart-body p-3">
      <p v-if="cartStore.items.length === 0" class="text-center text-muted mt-5">Your cart is empty.</p>
      
      <div v-else class="cart-items-wrapper">
        <div v-for="item in cartStore.items" :key="item._id" class="cart-item card mb-2 border-0 shadow-sm">
          <div class="card-body d-flex justify-content-between align-items-center py-2 px-3">
            <div>
              <h6 class="m-0 fw-bold">{{ item.name }}</h6>
              <small class="text-muted">{{ item.price }} EGP x {{ item.qty }}</small>
            </div>
            <div class="d-flex align-items-center gap-3">
              <span class="fw-bold text-success">{{ item.price * item.qty }} EGP</span>
              <button class="btn btn-sm btn-outline-danger" @click="cartStore.removeFromCart(item._id)">
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="cartStore.items.length > 0" class="cart-footer p-3 bg-light border-top">
      <div class="d-flex justify-content-between mb-3 text-dark">
        <span class="fw-bold fs-5">Total:</span>
        <span class="fw-bold fs-5 text-primary">{{ cartStore.totalPrice }} EGP</span>
      </div>
      <button class="btn btn-warning w-100 fw-bold py-2 mb-2" @click="cartStore.clearCart()">Clear Cart</button>
      <button class="btn btn-success w-100 fw-bold py-2 shadow-sm" @click="checkout">Checkout Process</button>
    </div>
  </div>

  <div v-if="cartStore.isOpen" class="cart-overlay" @click="cartStore.toggleSidebar(false)"></div>
</template>

<style scoped>
.cart-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background-color: white;
  z-index: 1050;
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
}

.cart-sidebar.open {
  right: 0;
}

.cart-body {
  flex-grow: 1;
  overflow-y: auto;
}

.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}
</style>
