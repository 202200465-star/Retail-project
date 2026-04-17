import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart')) || [],
    isOpen: false
  }),
  actions: {
    addToCart(product) {
      const exists = this.items.find(item => item._id === product._id)
      if (exists) {
        exists.qty += 1
      } else {
        this.items.push({ ...product, qty: 1 })
      }
      this.saveCart()
      this.isOpen = true
    },
    removeFromCart(id) {
      this.items = this.items.filter(i => i._id !== id)
      this.saveCart()
    },
    clearCart() {
      this.items = []
      this.saveCart()
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },
    toggleSidebar(state) {
      this.isOpen = state !== undefined ? state : !this.isOpen
    }
  },
  getters: {
    totalItems: (state) => state.items.reduce((acc, item) => acc + item.qty, 0),
    totalPrice: (state) => state.items.reduce((acc, item) => acc + (item.price * item.qty), 0)
  }
})
