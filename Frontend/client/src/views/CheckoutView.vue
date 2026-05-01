<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cartStore'
import orderService from '../services/orderService'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()
const loading = ref(false)
const orderSuccess = ref(false)
const errorMsg = ref('')

const form = ref({
  address: '',
  city: '',
  country: '',
  paymentMethod: 'Cash on Delivery'
})

const paymentOptions = ['Cash on Delivery', 'Credit Card', 'Debit Card', 'Vodafone Cash', 'Instapay']

const isFormValid = computed(() =>
  form.value.address.trim() && form.value.city.trim() && form.value.country.trim()
)

const processCheckout = async () => {
  if (!isFormValid.value) {
    errorMsg.value = 'Please fill in all shipping details.'
    return
  }
  errorMsg.value = ''
  loading.value = true
  try {
    const orderItems = cartStore.items.map(i => ({
      product: i._id,
      name: i.name,
      qty: i.qty,
      price: i.price,
      image: i.image || ''
    }))

    await orderService.createOrder({
      orderItems,
      totalPrice: cartStore.totalPrice,
      shippingAddress: {
        address: form.value.address,
        city: form.value.city,
        country: form.value.country
      },
      paymentMethod: form.value.paymentMethod
    })

    cartStore.clearCart()
    orderSuccess.value = true
  } catch (error) {
    errorMsg.value = error.response?.data?.message || 'Checkout failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container py-5">

    <!-- Success Screen -->
    <div v-if="orderSuccess" class="success-screen text-center animate-fade-in">
      <div class="success-icon mb-4">
        <i class="bi bi-check-circle-fill text-success" style="font-size: 5rem;"></i>
      </div>
      <h2 class="fw-bold mb-2">Order Placed Successfully!</h2>
      <p class="text-muted mb-4">Your order has been recorded and is now <strong>Pending</strong>.</p>
      <div class="d-flex gap-3 justify-content-center flex-wrap">
        <router-link to="/my-orders" class="btn btn-primary fw-bold px-4">
          <i class="bi bi-bag-check me-2"></i>View My Orders
        </router-link>
        <router-link to="/products" class="btn btn-outline-secondary px-4">
          <i class="bi bi-arrow-left me-1"></i>Continue Shopping
        </router-link>
      </div>
    </div>

    <!-- Empty Cart -->
    <div v-else-if="cartStore.items.length === 0" class="text-center py-5">
      <i class="bi bi-cart-x fs-1 text-muted"></i>
      <h5 class="mt-3 text-muted fw-semibold">Your cart is empty</h5>
      <router-link to="/products" class="btn btn-primary mt-3 fw-bold">
        <i class="bi bi-arrow-left me-1"></i>Back to Shop
      </router-link>
    </div>

    <!-- Checkout Form -->
    <div v-else class="animate-fade-in">
      <div class="checkout-header mb-4">
        <h2 class="fw-bold mb-1"><i class="bi bi-lock me-2 text-primary"></i>Secure Checkout</h2>
        <p class="text-muted mb-0">Review your order and fill in your details</p>
      </div>

      <div class="row g-4">

        <!-- LEFT: Form -->
        <div class="col-lg-7">

          <!-- Shipping Address -->
          <div class="checkout-card mb-4">
            <div class="checkout-card-title">
              <i class="bi bi-geo-alt-fill me-2 text-primary"></i>Shipping Address
            </div>
            <div class="card-body p-4">
              <div class="mb-3">
                <label class="form-label fw-semibold small">Street Address *</label>
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.address"
                  placeholder="e.g. 12 El-Tahrir Street"
                />
              </div>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label fw-semibold small">City *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.city"
                    placeholder="e.g. Cairo"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-semibold small">Country *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="form.country"
                    placeholder="e.g. Egypt"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="checkout-card">
            <div class="checkout-card-title">
              <i class="bi bi-wallet2 me-2 text-primary"></i>Payment Method
            </div>
            <div class="card-body p-4">
              <div class="payment-options">
                <label
                  v-for="opt in paymentOptions"
                  :key="opt"
                  class="payment-option"
                  :class="{ selected: form.paymentMethod === opt }"
                >
                  <input type="radio" :value="opt" v-model="form.paymentMethod" class="d-none" />
                  <i class="bi me-2" :class="
                    opt === 'Cash on Delivery' ? 'bi-cash-stack' :
                    opt === 'Credit Card' || opt === 'Debit Card' ? 'bi-credit-card' :
                    'bi-phone'
                  "></i>
                  {{ opt }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Order Summary -->
        <div class="col-lg-5">
          <div class="checkout-card sticky-summary">
            <div class="checkout-card-title">
              <i class="bi bi-receipt me-2 text-primary"></i>Order Summary
            </div>
            <div class="card-body p-4">
              <div
                v-for="item in cartStore.items"
                :key="item._id"
                class="summary-item"
              >
                <div>
                  <div class="fw-semibold">{{ item.name }}</div>
                  <div class="text-muted small">× {{ item.qty }}</div>
                </div>
                <div class="fw-bold text-success">{{ (item.price * item.qty).toFixed(2) }} EGP</div>
              </div>

              <hr class="my-3"/>

              <div class="d-flex justify-content-between align-items-center mb-4">
                <span class="fw-bold fs-5">Total</span>
                <span class="fw-bold fs-5 text-success">{{ cartStore.totalPrice.toFixed(2) }} EGP</span>
              </div>

              <!-- Error -->
              <div v-if="errorMsg" class="alert alert-danger py-2 small rounded-3 mb-3">
                <i class="bi bi-exclamation-triangle-fill me-1"></i>{{ errorMsg }}
              </div>

              <!-- Place Order Button -->
              <button
                class="btn btn-primary w-100 py-3 fw-bold fs-5 place-order-btn"
                @click="processCheckout"
                :disabled="loading"
              >
                <span v-if="loading">
                  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                  Processing...
                </span>
                <span v-else>
                  <i class="bi bi-shield-check me-2"></i>Place Order
                </span>
              </button>
              <p class="text-muted text-center small mt-2">
                <i class="bi bi-lock-fill me-1"></i>Your order is protected
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.checkout-header {
  border-left: 5px solid #2563eb;
  padding-left: 1.2rem;
}

.checkout-card {
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  background: #fff;
}
.checkout-card-title {
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.85rem 1.4rem;
  font-weight: 700;
  font-size: 0.95rem;
  color: #1e293b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.sticky-summary {
  position: sticky;
  top: 80px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.55rem 0;
  border-bottom: 1px dashed #e2e8f0;
  font-size: 0.9rem;
}
.summary-item:last-of-type { border-bottom: none; }

/* Payment options */
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.payment-option {
  display: flex;
  align-items: center;
  padding: 0.7rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s;
  color: #475569;
}
.payment-option:hover { border-color: #93c5fd; background: #f0f7ff; }
.payment-option.selected { border-color: #2563eb; background: #eff6ff; color: #1d4ed8; }

/* Place order btn */
.place-order-btn {
  border-radius: 12px;
  background: linear-gradient(135deg, #1d4ed8, #2563eb);
  border: none;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
  transition: transform 0.15s, box-shadow 0.15s;
}
.place-order-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.45);
}

/* Success screen */
.success-screen {
  max-width: 500px;
  margin: 4rem auto;
  background: #fff;
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 8px 40px rgba(0,0,0,0.1);
  border: 1px solid #e2e8f0;
}
</style>
