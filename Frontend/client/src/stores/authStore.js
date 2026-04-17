import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || (JSON.parse(localStorage.getItem('user'))?.token || null)
  }),
  actions: {
    setUser(userData) {
      if (!userData) return
      this.user = { ...userData }
      this.token = userData.token || this.token
      localStorage.setItem('user', JSON.stringify(this.user))
      if (this.token) localStorage.setItem('token', this.token)
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'admin'
  }
})
