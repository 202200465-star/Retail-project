<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { getImageUrl } from '../services/api'
import authService from '../services/authService'

const authStore = useAuthStore()

const formData = ref({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  profilePhoto: null
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleFileChange = (e) => {
  formData.value.profilePhoto = e.target.files[0]
}

const updateProfile = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  
  if (formData.value.newPassword && formData.value.newPassword !== formData.value.confirmPassword) {
    errorMessage.value = "New passwords do not match!"
    return
  }
  if (!formData.value.currentPassword) {
    errorMessage.value = "Current password is strictly required to authorize changes."
    return
  }

  loading.value = true
  try {
    const fd = new FormData()
    fd.append('name', formData.value.name)
    fd.append('email', formData.value.email)
    fd.append('currentPassword', formData.value.currentPassword)
    
    if (formData.value.newPassword) {
      fd.append('newPassword', formData.value.newPassword)
    }
    if (formData.value.profilePhoto) {
      fd.append('profilePhoto', formData.value.profilePhoto)
    }

    const res = await authService.updateProfile(fd)
    
    // Update local store with new returned user data
    authStore.setUser(res.data)
    
    successMessage.value = "Profile updated successfully!"
    formData.value.currentPassword = ''
    formData.value.newPassword = ''
    formData.value.confirmPassword = ''
  } catch (error) {
    errorMessage.value = error.response?.data?.message || "Failed to update profile."
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container py-5">
    <div class="row w-100 mx-auto g-4" style="max-width: 1000px;">
      
      <!-- Profile Display Sidebar -->
      <div class="col-lg-4">
        <div class="card shadow-sm border-0 p-5 text-center rounded-4 h-100 bg-dark text-white">
          <div class="position-relative d-inline-block mx-auto mb-4">
            <img 
              :src="getImageUrl(authStore.user?.profilePhoto || '/uploads/default.png')" 
              class="rounded-circle object-fit-cover border border-4 border-primary shadow-lg" 
              style="width: 150px; height: 150px; transition: transform 0.3s;"
              @error="(e) => { e.target.src = 'https://via.placeholder.com/150' }"
            />
          </div>
          <h3 class="fw-bolder">{{ authStore.user?.name }}</h3>
          <p class="text-secondary mb-4">{{ authStore.user?.email }}</p>
          
          <div class="mt-auto">
            <span class="badge w-100 py-3 rounded-pill fs-6" :class="authStore.isAdmin ? 'bg-danger' : 'bg-primary'">
              <i class="bi" :class="authStore.isAdmin ? 'bi-shield-lock-fill' : 'bi-person-fill'"></i>
              Account Level: {{ authStore.user?.role?.toUpperCase() }}
            </span>
          </div>
        </div>
      </div>

      <!-- Update Form Area -->
      <div class="col-lg-8">
        <div class="card shadow-lg border-0 rounded-4 p-5 h-100">
          <h4 class="fw-bold mb-4">Account Settings</h4>
          
          <div v-if="successMessage" class="alert alert-success fw-bold p-3 rounded-3 shadow-sm">{{ successMessage }}</div>
          <div v-if="errorMessage" class="alert alert-danger fw-bold p-3 rounded-3 shadow-sm">{{ errorMessage }}</div>

          <form @submit.prevent="updateProfile">
            <div class="row g-3 mb-4">
              <div class="col-md-6">
                <label class="form-label fw-bold small text-muted">Full Name</label>
                <input type="text" class="form-control bg-light border-0 py-2" v-model="formData.name" required />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-bold small text-muted">Email Address</label>
                <input type="email" class="form-control bg-light border-0 py-2" v-model="formData.email" required />
              </div>
            </div>

            <div class="mb-4 p-4 border border-warning rounded-3 bg-opacity-10 bg-warning">
              <h6 class="fw-bold text-dark mb-3"><i class="bi bi-shield-lock me-2"></i>Security Verification</h6>
              <label class="form-label fw-bold small text-muted">Current Password (Required to save changes)</label>
              <input type="password" class="form-control border-WARNING py-2" v-model="formData.currentPassword" placeholder="Enter current password..." required />
            </div>

            <div class="row g-3 mb-4">
              <div class="col-md-6">
                <label class="form-label fw-bold small text-muted">New Password</label>
                <input type="password" class="form-control bg-light border-0 py-2" v-model="formData.newPassword" placeholder="Leave empty to keep current" />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-bold small text-muted">Confirm New Password</label>
                <input type="password" class="form-control bg-light border-0 py-2" v-model="formData.confirmPassword" />
              </div>
            </div>

            <div class="mb-5">
              <label class="form-label fw-bold small text-muted">Update Profile Image</label>
              <input type="file" class="form-control bg-light border-0" accept="image/*" @change="handleFileChange" />
            </div>

            <button type="submit" class="btn btn-primary btn-lg w-100 fw-bold py-3 shadow-sm" :disabled="loading">
              <i class="bi bi-arrow-repeat me-2"></i>
              {{ loading ? 'Synchronizing Records...' : 'Save Account Changes' }}
            </button>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.form-control:focus {
  background-color: white !important;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1);
}
</style>
