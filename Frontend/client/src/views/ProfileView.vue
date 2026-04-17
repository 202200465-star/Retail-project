<script setup>
import { useAuthStore } from '../stores/authStore'
import { getImageUrl } from '../services/api'
const authStore = useAuthStore()
</script>
<template>
  <div class="container py-5" style="max-width: 600px;">
    <div class="card shadow border-0 p-5 text-center rounded-4">
      <img 
        :src="getImageUrl(authStore.user?.profilePhoto || '/uploads/default.png')" 
        class="rounded-circle mx-auto mb-3 object-fit-cover shadow-sm border" 
        style="width: 120px; height: 120px;" 
      />
      <h2 class="fw-bold">{{ authStore.user?.name }}</h2>
      <p class="text-muted">{{ authStore.user?.email }}</p>
      <span class="badge w-25 mx-auto p-2" :class="authStore.isAdmin ? 'bg-danger' : 'bg-primary'">
        Role: {{ authStore.user?.role }}
      </span>
    </div>
  </div>
</template>
