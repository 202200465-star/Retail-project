<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import orderService from '../services/orderService'
import productService from '../services/productService'
import authService from '../services/authService'

const authStore = useAuthStore()
const activeTab = ref('orders')

const orders = ref([])
const products = ref([])
const users = ref([])
const loading = ref(true)

// CRUD State
const showModal = ref(false)
const editingProduct = ref(null)
const productForm = ref({ name: '', description: '', price: '', category: '', image: null })
const processing = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    const [ordersRes, productsRes, usersRes] = await Promise.all([
      orderService.getAllOrders().catch(() => ({ data: { data: [] } })),
      productService.getProducts().catch(() => ({ data: { data: [] } })),
      authService.getAllUsers().catch(() => ({ data: { data: [] } }))
    ])
    orders.value = ordersRes.data?.data || []
    products.value = productsRes.data?.data || []
    users.value = usersRes.data?.data || []
  } catch (error) {
    console.error("Admin dashboard fetch error:", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

// === CRUD LOGIC ===
const openModal = (product = null) => {
  editingProduct.value = product
  if (product) {
    productForm.value = {
      name: product.name,
      description: product.description || '',
      price: product.price,
      category: product.category,
      image: null
    }
  } else {
    productForm.value = { name: '', description: '', price: '', category: '', image: null }
  }
  showModal.value = true
}

const onFileSelect = (e) => {
  productForm.value.image = e.target.files[0]
}

const saveProduct = async () => {
  processing.value = true
  try {
    const fd = new FormData()
    fd.append('name', productForm.value.name)
    fd.append('description', productForm.value.description)
    fd.append('price', productForm.value.price)
    fd.append('category', productForm.value.category)
    if (productForm.value.image) {
      fd.append('image', productForm.value.image)
    }

    if (editingProduct.value) {
      await productService.updateProduct(editingProduct.value._id, fd)
    } else {
      await productService.addProduct(fd)
    }
    showModal.value = false
    await fetchData()
  } catch (err) {
    alert("Error saving: " + (err.response?.data?.message || err.message))
  } finally {
    processing.value = false
  }
}

const deleteProduct = async (id) => {
  if (!confirm("Are you sure you want to permanently delete this product?")) return
  try {
    await productService.deleteProduct(id)
    await fetchData()
  } catch (err) {
    alert("Delete failed")
  }
}
</script>

<template>
  <div class="container py-5">
    <div class="card shadow-sm p-4 border-0 bg-dark text-white mb-4 rounded-4">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h2 class="fw-bold"><i class="bi bi-shield-lock me-2"></i>Admin Dashboard</h2>
          <p class="mb-0 text-light">Logged in as: {{ authStore.user?.email }}</p>
        </div>
        <div class="badge bg-success p-2 fs-6">Master Admin</div>
      </div>
    </div>
    
    <!-- Tab Navigation -->
    <ul class="nav nav-tabs mb-4 fw-bold justify-content-center">
      <li class="nav-item">
        <button 
          class="nav-link text-dark px-5" 
          :class="{ 'active border-primary border-bottom-0 text-primary': activeTab === 'orders' }" 
          @click="activeTab = 'orders'"
        >
          <i class="bi bi-receipt me-2"></i> Orders
        </button>
      </li>
      <li class="nav-item">
        <button 
          class="nav-link text-dark px-5" 
          :class="{ 'active border-primary border-bottom-0 text-primary': activeTab === 'products' }" 
          @click="activeTab = 'products'"
        >
          <i class="bi bi-box-seam me-2"></i> Products
        </button>
      </li>
      <li class="nav-item">
        <button 
          class="nav-link text-dark px-5" 
          :class="{ 'active border-primary border-bottom-0 text-primary': activeTab === 'users' }" 
          @click="activeTab = 'users'"
        >
          <i class="bi bi-people me-2"></i> Users
        </button>
      </li>
    </ul>

    <!-- Content Area -->
    <div class="card shadow-sm border-0 p-4">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted fw-bold">Syncing Database...</p>
      </div>
      
      <div v-else>
        
        <!-- ORDERS TAB -->
        <div v-if="activeTab === 'orders'" class="animate-fade-in">
          <h4 class="mb-4 fw-bold">Platform Orders List</h4>
          <p v-if="orders.length === 0" class="text-muted text-center py-4">No active orders found.</p>
          <div v-else class="table-responsive">
            <table class="table table-hover align-middle">
              <thead class="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total Spent</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="o in orders" :key="o._id">
                  <td><code class="text-muted">{{ o._id }}</code></td>
                  <td>
                    <div class="fw-bold">{{ o.user?.name || "Unknown" }}</div>
                    <div class="text-muted small">{{ o.user?.email || "No email" }}</div>
                  </td>
                  <td class="fw-bold text-success">{{ o.totalPrice }} EGP</td>
                  <td>{{ new Date(o.createdAt).toLocaleDateString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- PRODUCTS TAB -->
        <div v-if="activeTab === 'products'" class="animate-fade-in">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bold m-0">Inventory Catalog</h4>
            <button class="btn btn-primary fw-bold" @click="openModal(null)">
              <i class="bi bi-plus-lg me-1"></i> Add Product
            </button>
          </div>
          
          <p v-if="products.length === 0" class="text-muted text-center py-4">Inventory is empty.</p>
          <div v-else class="table-responsive">
            <table class="table table-striped align-middle">
              <thead class="table-light">
                <tr>
                  <th>Product Base</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in products" :key="p._id">
                  <td class="fw-bold">{{ p.name }}</td>
                  <td><span class="badge bg-secondary">{{ p.category }}</span></td>
                  <td class="fw-bold text-success">{{ p.price }} EGP</td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-outline-warning me-2" @click="openModal(p)">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" @click="deleteProduct(p._id)">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- USERS TAB -->
        <div v-if="activeTab === 'users'" class="animate-fade-in">
          <h4 class="mb-4 fw-bold">Registered Accounts</h4>
          <p v-if="users.length === 0" class="text-muted text-center py-4">No registered users.</p>
          <div v-else class="table-responsive">
            <table class="table table-hover align-middle">
              <thead class="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="u in users" :key="u._id">
                  <td class="fw-bold">{{ u.name }}</td>
                  <td class="text-muted">{{ u.email }}</td>
                  <td>
                    <span class="badge p-2" :class="u.role === 'admin' ? 'bg-danger' : 'bg-primary'">
                      {{ u.role.toUpperCase() }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- CRUD Modal Overlay -->
  <div v-if="showModal" class="modal-backdrop-custom d-flex align-items-center justify-content-center">
    <div class="card shadow-lg border-0 w-100 mx-3 mx-md-auto" style="max-width: 500px; z-index: 1055;">
      <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
        <h5 class="m-0 fw-bold">{{ editingProduct ? 'Edit Product' : 'Create New Product' }}</h5>
        <button class="btn-close btn-close-white" @click="showModal = false"></button>
      </div>
      <div class="card-body">
        <form @submit.prevent="saveProduct">
          <div class="mb-3">
            <label class="form-label fw-bold small">Product Name</label>
            <input type="text" class="form-control" v-model="productForm.name" required />
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label fw-bold small">Price (EGP)</label>
              <input type="number" class="form-control" v-model="productForm.price" required min="0" />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-bold small">Category</label>
              <input type="text" class="form-control" v-model="productForm.category" required />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold small">Description</label>
            <textarea class="form-control" rows="3" v-model="productForm.description"></textarea>
          </div>
          <div class="mb-4">
            <label class="form-label fw-bold small">Upload Product Image</label>
            <input type="file" class="form-control" accept="image/*" @change="onFileSelect" />
            <small class="text-muted d-block mt-1" v-if="editingProduct">Leave empty to keep existing image</small>
          </div>
          <div class="d-flex gap-2 justify-content-end">
            <button type="button" class="btn btn-light" @click="showModal = false">Cancel</button>
            <button type="submit" class="btn btn-primary fw-bold px-4" :disabled="processing">
              {{ processing ? 'Saving...' : 'Save Product' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
.nav-tabs .nav-link {
  transition: all 0.3s;
  background-color: transparent;
  border-radius: 10px 10px 0 0;
}
.nav-tabs .nav-link:hover {
  background-color: #f8f9fa;
}
.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.6);
  z-index: 1050;
  backdrop-filter: blur(2px);
}
</style>
