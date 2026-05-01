<script setup>
import { ref, onMounted } from 'vue'
import orderService from '../services/orderService'

const orders = ref([])
const loading = ref(true)
const error = ref(null)

const fetchOrders = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await orderService.getMyOrders()
    orders.value = res.data?.data || []
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load your orders.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchOrders)

const statusClass = (status) => {
  const map = {
    Pending:   'badge-pending',
    Paid:      'badge-paid',
    Shipped:   'badge-shipped',
    Delivered: 'badge-delivered',
  }
  return map[status] || 'bg-secondary'
}

const statusIcon = (status) => {
  const map = {
    Pending:   'bi-hourglass-split',
    Paid:      'bi-credit-card-2-front',
    Shipped:   'bi-truck',
    Delivered: 'bi-check-circle',
  }
  return map[status] || 'bi-circle'
}
</script>

<template>
  <div class="container py-5">

    <!-- Page Header -->
    <div class="page-header mb-5">
      <div class="header-inner">
        <h2 class="fw-bold mb-1"><i class="bi bi-bag-check me-2"></i>My Orders</h2>
        <p class="text-muted mb-0">Track all your past and current orders</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" style="width: 2.5rem; height: 2.5rem;" role="status"></div>
      <p class="mt-3 text-muted fw-semibold">Loading your orders...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="alert alert-danger d-flex align-items-center gap-2 rounded-3 shadow-sm">
      <i class="bi bi-exclamation-triangle-fill fs-5"></i>
      <span>{{ error }}</span>
    </div>

    <!-- Empty State -->
    <div v-else-if="orders.length === 0" class="empty-box text-center py-5">
      <i class="bi bi-bag-x fs-1 text-muted"></i>
      <h5 class="mt-3 fw-bold text-muted">No orders yet</h5>
      <p class="text-muted">Start shopping and your orders will appear here.</p>
      <router-link to="/products" class="btn btn-primary fw-bold mt-2">
        <i class="bi bi-arrow-right me-1"></i> Browse Products
      </router-link>
    </div>

    <!-- Orders List -->
    <div v-else class="orders-list">
      <div
        v-for="order in orders"
        :key="order._id"
        class="order-card animate-fade-in"
      >
        <!-- Card Header -->
        <div class="order-card-header">
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <span class="order-id-label">Order</span>
            <code class="order-id">#{{ order._id.slice(-8).toUpperCase() }}</code>
          </div>
          <div class="d-flex align-items-center gap-3">
            <span class="text-muted small">
              <i class="bi bi-calendar3 me-1"></i>
              {{ new Date(order.createdAt).toLocaleDateString('en-EG', { day: '2-digit', month: 'short', year: 'numeric' }) }}
            </span>
            <span class="status-badge" :class="statusClass(order.status)">
              <i class="bi me-1" :class="statusIcon(order.status)"></i>
              {{ order.status }}
            </span>
          </div>
        </div>

        <!-- Order Items -->
        <div class="order-items-list">
          <div
            v-for="item in order.orderItems"
            :key="item._id"
            class="order-item-row"
          >
            <div class="item-info">
              <span class="item-name fw-semibold">{{ item.name }}</span>
              <span class="item-qty text-muted">× {{ item.qty }}</span>
            </div>
            <span class="item-price fw-bold text-success">{{ (item.price * item.qty).toFixed(2) }} EGP</span>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="order-card-footer">
          <div class="d-flex align-items-center gap-2 text-muted small" v-if="order.paymentMethod">
            <i class="bi bi-wallet2"></i>
            <span>{{ order.paymentMethod }}</span>
          </div>
          <div class="total-price">
            Total: <strong>{{ order.totalPrice?.toFixed(2) }} EGP</strong>
          </div>
        </div>

        <!-- Status Progress Bar -->
        <div class="status-progress mt-3">
          <div
            v-for="(step, i) in ['Pending', 'Paid', 'Shipped', 'Delivered']"
            :key="step"
            class="progress-step"
            :class="{
              active: ['Pending','Paid','Shipped','Delivered'].indexOf(order.status) >= i,
              current: order.status === step
            }"
          >
            <div class="step-dot">
              <i class="bi" :class="[
                step === 'Pending'   ? 'bi-hourglass-split' :
                step === 'Paid'      ? 'bi-credit-card' :
                step === 'Shipped'   ? 'bi-truck' :
                'bi-check-lg'
              ]"></i>
            </div>
            <span class="step-label">{{ step }}</span>
            <div v-if="i < 3" class="step-line"></div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
/* Animations */
.animate-fade-in {
  animation: fadeIn 0.45s ease both;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Page Header */
.page-header {
  border-left: 5px solid #2563eb;
  padding-left: 1.2rem;
}

/* Order Card */
.order-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.07);
  margin-bottom: 1.5rem;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: box-shadow 0.25s;
}
.order-card:hover {
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}

.order-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem 1.4rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}
.order-id-label { font-size: 0.8rem; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; }
.order-id { font-size: 0.85rem; background: #e2e8f0; padding: 2px 8px; border-radius: 6px; color: #1e293b; }

/* Items */
.order-items-list { padding: 0.8rem 1.4rem; }
.order-item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #e2e8f0;
  font-size: 0.9rem;
}
.order-item-row:last-child { border-bottom: none; }
.item-info { display: flex; align-items: center; gap: 0.6rem; }
.item-qty { font-size: 0.8rem; background: #f1f5f9; padding: 1px 7px; border-radius: 10px; }

.order-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.4rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}
.total-price { font-size: 1rem; color: #1e293b; }
.total-price strong { color: #16a34a; font-size: 1.1rem; }

/* Status badges */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.28em 0.8em;
  border-radius: 20px;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.badge-pending   { background: #fef3c7; color: #b45309; border: 1px solid #fcd34d; }
.badge-paid      { background: #d1fae5; color: #065f46; border: 1px solid #6ee7b7; }
.badge-shipped   { background: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; }
.badge-delivered { background: #dcfce7; color: #166534; border: 1px solid #86efac; }

/* Progress Steps */
.status-progress {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0.5rem 1.4rem 1.2rem;
  gap: 0;
  position: relative;
}
.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
}
.step-dot {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e2e8f0;
  color: #94a3b8;
  font-size: 0.9rem;
  z-index: 1;
  transition: all 0.3s;
}
.progress-step.active .step-dot {
  background: #2563eb;
  color: #fff;
}
.progress-step.current .step-dot {
  background: #1d4ed8;
  color: #fff;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2);
}
.step-label {
  font-size: 0.7rem;
  text-align: center;
  margin-top: 5px;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.progress-step.active .step-label { color: #2563eb; }
.step-line {
  position: absolute;
  top: 17px;
  left: calc(50% + 17px);
  right: calc(-50% + 17px);
  height: 2px;
  background: #e2e8f0;
  z-index: 0;
}
.progress-step.active .step-line { background: #2563eb; }
</style>
