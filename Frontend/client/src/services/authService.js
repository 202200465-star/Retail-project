import api from './api'

export default {
  login(credentials) {
    return api.post('/auth/login', credentials)
  },
  register(userData) {
    return api.post('/auth/register', userData)
  },
  updateProfile(data) {
    return api.put('/users/profile', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  getAllUsers() {
    return api.get('/users')
  },
  updateUser(id, data) {
    return api.put(`/users/${id}`, data)
  }
}
