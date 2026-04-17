<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/authService'

const router = useRouter()
const formData = ref({ name: '', email: '', password: '' })
const loading = ref(false)

const handleRegister = async () => {
  loading.value = true
  try {
    await authService.register(formData.value)
    alert('Registration successful!')
    router.push('/login')
  } catch (err) {
    alert(err.response?.data?.message || 'Registration Failed')
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="container py-5">
    <div class="card shadow-sm border-0 mx-auto p-4" style="max-width: 450px;">
      <h2 class="text-center fw-bold mb-4">Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label>Name</label>
          <input type="text" class="form-control" v-model="formData.name" required />
        </div>
        <div class="mb-3">
          <label>Email</label>
          <input type="email" class="form-control" v-model="formData.email" required />
        </div>
        <div class="mb-3">
          <label>Password</label>
          <input type="password" class="form-control" v-model="formData.password" required />
        </div>
        <button class="btn btn-success w-100" type="submit" :disabled="loading">
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </form>
    </div>
  </div>
</template>
