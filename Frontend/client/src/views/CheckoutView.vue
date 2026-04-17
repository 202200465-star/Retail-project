<script setup>
import { useCartStore } from '../stores/cartStore'
import orderService from '../services/orderService'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const cartStore = useCartStore()
const router = useRouter()
const loading = ref(false)

const processCheckout = async () => {
  loading.value = true
  try {
    const orderItems = cartStore.items.map(i => ({
      product: i._id,
      name: i.name,
      qty: i.qty,
      price: i.price
    }))
    
    await orderService.createOrder({
      orderItems,
      totalPrice: cartStore.totalPrice
    })
    
    alert("Checkout Success! Order recorded.")
    cartStore.clearCart()
    router.push('/products')
  } catch (error) {
    alert("Checkout failed: " + (error.response?.data?.message || error.message))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container py-5 text-center">
    <h2>Secure Checkout</h2>
    <p v-if="cartStore.items.length === 0" class="text-muted mt-3">Your cart is empty.</p>
    <div v-else class="card shadow border-0 p-4 mt-4 mx-auto" style="max-width: 500px;">
      <h4 class="fw-bold text-success mb-4">Total Amount: {{ cartStore.totalPrice }} EGP</h4>
      <button class="btn btn-primary w-100 py-3 fw-bold" @click="processCheckout" :disabled="loading">
        {{ loading ? 'Processing...' : 'Confirm & Pay' }}
      </button>
    </div>
  </div>
</template>
