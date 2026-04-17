<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import authService from '../services/authService'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({ email: '', password: '' })
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    const response = await authService.login(formData.value)
    authStore.setUser(response.data)
    if (response.data.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/products')
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Login Failed')
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="container py-5">
    <div class="card shadow-lg border-0 mx-auto p-4" style="max-width: 450px;">
      <h2 class="text-center fw-bold mb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label>Email</label>
          <input type="email" class="form-control" v-model="formData.email" required />
        </div>
        <div class="mb-3">
          <label>Password</label>
          <input type="password" class="form-control" v-model="formData.password" required />
        </div>
        <button class="btn btn-warning w-100 fw-bold" type="submit" :disabled="loading">
          {{ loading ? 'Authenticating...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>
