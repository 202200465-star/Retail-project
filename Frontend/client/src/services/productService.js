import api from './api'

export default {
  getProducts() {
    return api.get('/products')
  },
  addProduct(data) {
    return api.post('/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  updateProduct(id, data) {
    return api.put(`/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  deleteProduct(id) {
    return api.delete(`/products/${id}`)
  }
}
