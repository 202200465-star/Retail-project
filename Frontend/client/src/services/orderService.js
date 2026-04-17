import api from './api'

export default {
  createOrder(orderData) {
    return api.post('/orders', orderData)
  },
  getMyOrders() {
    return api.get('/orders/myorders')
  },
  getAllOrders() {
    return api.get('/orders/all')
  }
}
