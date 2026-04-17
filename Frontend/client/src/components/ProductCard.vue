<script setup>
import { getImageUrl } from '../services/api'
import { useCartStore } from '../stores/cartStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['view-details'])
const cartStore = useCartStore()

const handleImgError = (event) => {
  event.target.src = 'https://via.placeholder.com/200'
}
</script>

<template>
  <div class="col-md-6 col-lg-4">
    <div class="card h-100 product-card border-0 shadow-sm" @click="emit('view-details', product)">
      <img 
        :src="getImageUrl(product.image || '/uploads/default-product.png')" 
        class="card-img-top object-fit-cover" 
        :alt="product.name"
        style="height: 200px"
        @error="handleImgError"
      />
      <div class="card-body">
        <span class="badge bg-info text-dark mb-2">{{ product.category }}</span>
        <h5 class="card-title fw-bold">{{ product.name }}</h5>
        <p class="card-text text-muted">{{ product.description }}</p>
      </div>
      <div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
        <span class="fw-bold text-success fs-5">{{ product.price }} EGP</span>
        <button class="btn btn-sm btn-primary" @click.stop="cartStore.addToCart(product)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>
