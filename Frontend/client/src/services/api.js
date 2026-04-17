import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token') || JSON.parse(localStorage.getItem('user'))?.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getImageUrl = (path) => {
  if (!path) return 'https://via.placeholder.com/300'
  if (path.startsWith('http')) return path
  const base = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000'
  return `${base}${path}`
}

export default api
