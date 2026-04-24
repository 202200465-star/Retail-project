<script setup>
import { ref, computed } from 'vue'
import { getImageUrl } from '../services/api'
import { useCartStore } from '../stores/cartStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['view-details', 'quick-view'])
const cartStore = useCartStore()

const isWishlisted = ref(false)
const addedToCart = ref(false)
const imageLoaded = ref(false)

const handleImgError = (event) => {
  event.target.src = 'https://placehold.co/400x300/e2e8f0/94a3b8?text=No+Image'
}

const handleImgLoad = () => {
  imageLoaded.value = true
}

const handleAddToCart = () => {
  cartStore.addToCart(props.product)
  addedToCart.value = true
  setTimeout(() => { addedToCart.value = false }, 1800)
}

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value
}

// Generate a mock star rating between 3.5–5.0 based on product id
const rating = computed(() => {
  const seed = props.product._id ? props.product._id.charCodeAt(props.product._id.length - 1) : 42
  return (3.5 + (seed % 15) * 0.1).toFixed(1)
})

const reviewCount = computed(() => {
  const seed = props.product._id ? props.product._id.charCodeAt(0) : 42
  return 12 + (seed % 88)
})

const fullStars = computed(() => Math.floor(parseFloat(rating.value)))
const hasHalfStar = computed(() => parseFloat(rating.value) % 1 >= 0.5)

const categoryColors = {
  Electronics: 'category-tech',
  Clothing: 'category-fashion',
  Food: 'category-food',
  Books: 'category-books',
  Home: 'category-home',
  Sports: 'category-sports',
}

const categoryClass = computed(() => {
  return categoryColors[props.product.category] || 'category-default'
})

const stockStatus = computed(() => {
  const qty = props.product.stock ?? props.product.quantity ?? 99
  if (qty === 0) return { label: 'Out of Stock', cls: 'stock-out' }
  if (qty <= 5) return { label: `Only ${qty} left!`, cls: 'stock-low' }
  return { label: 'In Stock', cls: 'stock-ok' }
})
</script>

<template>
  <div class="col-sm-6 col-lg-4 col-xl-3 product-col">
    <div class="pc-wrapper" :class="{ 'pc-wishlisted': isWishlisted }">
      <!-- Wishlist Button -->
      <button class="pc-wish-btn" @click.stop="toggleWishlist" :title="isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'">
        <i :class="isWishlisted ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
      </button>

      <!-- Quick View Button -->
      <button class="pc-quick-btn" @click.stop="emit('quick-view', product)" title="Quick View">
        <i class="bi bi-eye"></i> Quick View
      </button>

      <!-- Image -->
      <div class="pc-image-wrap" @click="emit('view-details', product)">
        <div class="pc-img-skeleton" :class="{ hidden: imageLoaded }"></div>
        <img
          :src="getImageUrl(product.image || '/uploads/default-product.png')"
          class="pc-img"
          :class="{ loaded: imageLoaded }"
          :alt="product.name"
          @error="handleImgError"
          @load="handleImgLoad"
        />
        <!-- Category Badge -->
        <span class="pc-category-badge" :class="categoryClass">{{ product.category || 'General' }}</span>
        <!-- Stock -->
        <span class="pc-stock-badge" :class="stockStatus.cls">{{ stockStatus.label }}</span>
      </div>

      <!-- Body -->
      <div class="pc-body">
        <h5 class="pc-title" @click="emit('view-details', product)" :title="product.name">
          {{ product.name }}
        </h5>
        <p class="pc-desc">{{ product.description }}</p>

        <!-- Rating -->
        <div class="pc-rating">
          <span v-for="n in fullStars" :key="'f' + n" class="star star-full"><i class="bi bi-star-fill"></i></span>
          <span v-if="hasHalfStar" class="star star-half"><i class="bi bi-star-half"></i></span>
          <span v-for="n in (5 - fullStars - (hasHalfStar ? 1 : 0))" :key="'e' + n" class="star star-empty"><i class="bi bi-star"></i></span>
          <span class="pc-rating-text">{{ rating }} <span class="text-muted">({{ reviewCount }})</span></span>
        </div>
      </div>

      <!-- Footer -->
      <div class="pc-footer">
        <div class="pc-price">
          <span class="pc-price-curr">{{ Number(product.price).toLocaleString('en-EG') }} <span class="pc-currency">EGP</span></span>
        </div>
        <button
          class="pc-cart-btn"
          :class="{ 'pc-cart-added': addedToCart }"
          @click.stop="handleAddToCart"
          :disabled="stockStatus.cls === 'stock-out'"
        >
          <span class="pc-cart-default">
            <i class="bi bi-cart-plus"></i> Add to Cart
          </span>
          <span class="pc-cart-confirm">
            <i class="bi bi-check-circle-fill"></i> Added!
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Wrapper ───────────────────────────────────── */
.product-col { padding: 10px; }

.pc-wrapper {
  position: relative;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,.07);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform .32s cubic-bezier(.22,1,.36,1), box-shadow .32s cubic-bezier(.22,1,.36,1);
  border: 1.5px solid rgba(0,0,0,.05);
}

.pc-wrapper:hover {
  transform: translateY(-8px) scale(1.012);
  box-shadow: 0 20px 48px rgba(0,0,0,.13);
  border-color: rgba(99,102,241,.2);
}

/* ── Wishlist & Quick view ─────────────────────── */
.pc-wish-btn {
  position: absolute;
  top: 12px; right: 12px;
  z-index: 10;
  background: rgba(255,255,255,.85);
  backdrop-filter: blur(8px);
  border: none;
  border-radius: 50%;
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  color: #cbd5e1;
  font-size: 17px;
  transition: color .2s, background .2s, transform .2s;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
}
.pc-wish-btn:hover { color: #ef4444; background: #fff; transform: scale(1.15); }
.pc-wishlisted .pc-wish-btn { color: #ef4444; background: #fff5f5; }

.pc-quick-btn {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 9;
  background: rgba(15,23,42,.82);
  backdrop-filter: blur(6px);
  border: none;
  color: #e2e8f0;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .5px;
  padding: 9px 0;
  cursor: pointer;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity .25s, transform .25s;
  display: flex; align-items: center; justify-content: center; gap: 6px;
}
.pc-quick-btn i { font-size: 14px; }
.pc-wrapper:hover .pc-quick-btn { opacity: 1; transform: translateY(0); }

/* ── Image ─────────────────────────────────────── */
.pc-image-wrap {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  height: 210px;
  background: #f1f5f9;
}

.pc-img-skeleton {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
.pc-img-skeleton.hidden { display: none; }

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.pc-img {
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity .4s ease, transform .45s cubic-bezier(.22,1,.36,1);
}
.pc-img.loaded { opacity: 1; }
.pc-wrapper:hover .pc-img { transform: scale(1.07); }

/* ── Badges ────────────────────────────────────── */
.pc-category-badge {
  position: absolute;
  top: 12px; left: 12px;
  font-size: 10.5px; font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: .4px;
  text-transform: uppercase;
}
.category-tech     { background: #dbeafe; color: #1d4ed8; }
.category-fashion  { background: #fce7f3; color: #9d174d; }
.category-food     { background: #dcfce7; color: #166534; }
.category-books    { background: #fef9c3; color: #854d0e; }
.category-home     { background: #f3e8ff; color: #6b21a8; }
.category-sports   { background: #ffedd5; color: #9a3412; }
.category-default  { background: #e2e8f0; color: #475569; }

.pc-stock-badge {
  position: absolute;
  bottom: 12px; left: 12px;
  font-size: 10px; font-weight: 700;
  padding: 2px 9px;
  border-radius: 20px;
  letter-spacing: .4px;
}
.stock-ok  { background: #bbf7d0; color: #14532d; }
.stock-low { background: #fed7aa; color: #7c2d12; animation: pulse-badge 1.6s ease-in-out infinite; }
.stock-out { background: #fecaca; color: #7f1d1d; }

@keyframes pulse-badge {
  0%, 100% { opacity: 1; } 50% { opacity: .65; }
}

/* ── Body ──────────────────────────────────────── */
.pc-body { padding: 14px 16px 6px; flex: 1; }

.pc-title {
  font-size: 15px; font-weight: 700;
  color: #0f172a;
  margin: 0 0 6px;
  cursor: pointer;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  transition: color .2s;
}
.pc-title:hover { color: #6366f1; }

.pc-desc {
  font-size: 12.5px; color: #64748b;
  margin: 0 0 10px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

/* ── Rating ────────────────────────────────────── */
.pc-rating { display: flex; align-items: center; gap: 2px; margin-bottom: 4px; }
.star { font-size: 12px; }
.star-full { color: #f59e0b; }
.star-half { color: #f59e0b; }
.star-empty { color: #cbd5e1; }
.pc-rating-text { font-size: 12px; font-weight: 600; color: #374151; margin-left: 6px; }

/* ── Footer ────────────────────────────────────── */
.pc-footer {
  padding: 12px 16px 16px;
  display: flex; align-items: center; justify-content: space-between;
  border-top: 1px solid #f1f5f9;
  gap: 8px;
}

.pc-price-curr {
  font-size: 18px; font-weight: 800;
  color: #0f172a;
  letter-spacing: -.3px;
}
.pc-currency { font-size: 12px; font-weight: 600; color: #64748b; }

/* ── Add to Cart Button ────────────────────────── */
.pc-cart-btn {
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 12px;
  padding: 9px 16px;
  font-size: 13px; font-weight: 700;
  cursor: pointer;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
  transition: background .25s, transform .18s, box-shadow .25s;
  white-space: nowrap;
  display: flex; align-items: center; gap: 6px;
  min-width: 126px; justify-content: center;
}
.pc-cart-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  box-shadow: 0 6px 20px rgba(99,102,241,.38);
  transform: scale(1.04);
}
.pc-cart-btn:active:not(:disabled) { transform: scale(.97); }
.pc-cart-btn:disabled {
  background: #e2e8f0; color: #94a3b8; cursor: not-allowed;
}

.pc-cart-default, .pc-cart-confirm {
  display: flex; align-items: center; gap: 6px;
  transition: opacity .25s, transform .25s;
  position: absolute;
}
.pc-cart-default { opacity: 1; transform: translateY(0); }
.pc-cart-confirm { opacity: 0; transform: translateY(8px); }
.pc-cart-added .pc-cart-default { opacity: 0; transform: translateY(-8px); }
.pc-cart-added .pc-cart-confirm { opacity: 1; transform: translateY(0); }
.pc-cart-btn { min-height: 38px; } /* ensure height for absolute children */
</style>
