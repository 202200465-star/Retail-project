<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import productService from '../services/productService'

const products = ref([])
const loading = ref(true)

const fetchProducts = async () => {
  try {
    const response = await productService.getProducts()
    products.value = response.data.data || []
  } catch (error) {
    console.error("Error fetching products:", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})

const goToDetails = (product) => {
  console.log("View Details clicked for", product.name)
}
</script>

<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4">Our Catalog</h2>
    <div v-if="loading" class="text-center py-5">Loading Products...</div>
    <div v-else class="row g-4">
      <ProductCard 
        v-for="product in products" 
        :key="product._id" 
        :product="product" 
        @view-details="goToDetails" 
      />
    </div>
  </div>
</template>
