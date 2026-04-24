<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import productService from '../services/productService'
import { getImageUrl } from '../services/api'

// ── Data ──────────────────────────────────────────────
const products = ref([])
const loading = ref(true)

// ── UI State ──────────────────────────────────────────
const searchQuery  = ref('')
const selectedCat  = ref('All')
const sortKey      = ref('default')
const viewMode     = ref('grid')   // 'grid' | 'list'
const priceMax     = ref(9999999)
const filtersOpen  = ref(false)

// ── Quick-View Modal ───────────────────────────────────
const quickProduct = ref(null)
const quickAdded   = ref(false)

// ── Fetch ──────────────────────────────────────────────
const fetchProducts = async () => {
  try {
    const response = await productService.getProducts()
    products.value = response.data.data || []
  } catch (err) {
    console.error('Error fetching products:', err)
  } finally {
    loading.value = false
  }
}
onMounted(fetchProducts)

// ── Categories ─────────────────────────────────────────
const categories = computed(() => {
  const cats = [...new Set(products.value.map(p => p.category).filter(Boolean))]
  return ['All', ...cats]
})

const maxProductPrice = computed(() =>
  Math.max(...products.value.map(p => Number(p.price) || 0), 100)
)

// Sync priceMax slider ceiling to actual max product price after load
watch(maxProductPrice, (val) => {
  priceMax.value = val
}, { immediate: false })

// ── Filtered + Sorted ──────────────────────────────────
const filtered = computed(() => {
  let list = products.value

  if (selectedCat.value !== 'All')
    list = list.filter(p => p.category === selectedCat.value)

  if (searchQuery.value.trim())
    list = list.filter(p =>
      p.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
    )

  list = list.filter(p => Number(p.price) <= priceMax.value)

  if (sortKey.value === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
  if (sortKey.value === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
  if (sortKey.value === 'name-asc')   list = [...list].sort((a, b) => a.name.localeCompare(b.name))
  if (sortKey.value === 'name-desc')  list = [...list].sort((a, b) => b.name.localeCompare(a.name))

  return list
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedCat.value = 'All'
  sortKey.value = 'default'
  priceMax.value = maxProductPrice.value
}

// ── Quick View ─────────────────────────────────────────
import { useCartStore } from '../stores/cartStore'
const cartStore = useCartStore()

const openQuickView = (product) => {
  quickProduct.value = product
  quickAdded.value = false
}
const closeQuickView = () => { quickProduct.value = null }
const quickAddToCart = () => {
  if (!quickProduct.value) return
  cartStore.addToCart(quickProduct.value)
  quickAdded.value = true
  setTimeout(() => { quickAdded.value = false }, 1800)
}

// ── Skeleton count ─────────────────────────────────────
const skeletonCount = 8
</script>

<template>
  <div class="products-page">

    <!-- ░░ HERO BANNER ░░ -->
    <section class="products-hero">
      <div class="hero-glow hero-glow-1"></div>
      <div class="hero-glow hero-glow-2"></div>
      <div class="products-hero-inner">
        <p class="hero-eyebrow"><i class="bi bi-grid-3x3-gap-fill me-1"></i> Full Catalog</p>
        <h1 class="hero-title">Discover Our <span class="hero-highlight">Products</span></h1>
        <p class="hero-sub">Browse {{ products.length }} carefully curated items — find exactly what you need.</p>
      </div>
    </section>

    <!-- ░░ CONTROLS BAR ░░ -->
    <section class="controls-bar">
      <div class="controls-inner">

        <!-- Search -->
        <div class="search-wrap">
          <i class="bi bi-search search-icon"></i>
          <input
            v-model="searchQuery"
            class="search-input"
            type="text"
            placeholder="Search products…"
          />
          <button v-if="searchQuery" class="search-clear" @click="searchQuery = ''">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <!-- Sort -->
        <div class="sort-wrap">
          <i class="bi bi-sort-down-alt sort-icon"></i>
          <select v-model="sortKey" class="sort-select">
            <option value="default">Default Order</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
          </select>
        </div>

        <!-- View Toggle -->
        <div class="view-toggle">
          <button :class="['vtbtn', { active: viewMode === 'grid' }]" @click="viewMode = 'grid'" title="Grid View">
            <i class="bi bi-grid-3x3-gap"></i>
          </button>
          <button :class="['vtbtn', { active: viewMode === 'list' }]" @click="viewMode = 'list'" title="List View">
            <i class="bi bi-list-ul"></i>
          </button>
        </div>

        <!-- Filter Toggle (mobile) -->
        <button class="filter-toggle-btn" @click="filtersOpen = !filtersOpen">
          <i class="bi bi-sliders"></i>
          <span>Filters</span>
          <span v-if="selectedCat !== 'All' || priceMax < maxProductPrice" class="filter-dot"></span>
        </button>
      </div>

      <!-- Category Tabs -->
      <div class="cat-tabs">
        <button
          v-for="cat in categories" :key="cat"
          :class="['cat-tab', { active: selectedCat === cat }]"
          @click="selectedCat = cat"
        >
          {{ cat }}
          <span v-if="cat !== 'All'" class="cat-count">
            {{ products.filter(p => p.category === cat).length }}
          </span>
          <span v-else class="cat-count">{{ products.length }}</span>
        </button>
      </div>

      <!-- Filter Panel -->
      <transition name="filter-slide">
        <div v-if="filtersOpen" class="filter-panel">
          <div class="fp-group">
            <label class="fp-label">
              <i class="bi bi-currency-dollar"></i>
              Max Price: <strong>{{ Number(priceMax).toLocaleString('en-EG') }} EGP</strong>
            </label>
            <input type="range" class="fp-range" :min="0" :max="maxProductPrice" step="50" v-model.number="priceMax" />
            <div class="fp-range-limits">
              <span>0 EGP</span><span>{{ Number(maxProductPrice).toLocaleString('en-EG') }} EGP</span>
            </div>
          </div>
          <button class="fp-clear" @click="clearFilters"><i class="bi bi-x-circle me-1"></i> Clear All Filters</button>
        </div>
      </transition>
    </section>

    <!-- ░░ RESULTS SUMMARY ░░ -->
    <div class="results-summary">
      <span v-if="!loading">
        Showing <strong>{{ filtered.length }}</strong> of <strong>{{ products.length }}</strong> products
        <span v-if="searchQuery"> for "<em>{{ searchQuery }}</em>"</span>
      </span>
    </div>

    <!-- ░░ PRODUCTS GRID ░░ -->
    <section class="products-content">

      <!-- Skeleton loading -->
      <div v-if="loading" :class="['product-row', viewMode === 'list' ? 'list-row' : '']">
        <div v-for="n in skeletonCount" :key="n" class="col-sm-6 col-lg-4 col-xl-3 product-col">
          <div class="skeleton-card">
            <div class="sk-img shimmer"></div>
            <div class="sk-body">
              <div class="sk-line shimmer" style="width:55%;height:12px;margin-bottom:8px"></div>
              <div class="sk-line shimmer" style="width:85%;height:16px;margin-bottom:6px"></div>
              <div class="sk-line shimmer" style="width:70%;height:12px;margin-bottom:18px"></div>
              <div class="sk-line shimmer" style="width:40%;height:24px"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filtered.length === 0" class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No products found</h3>
        <p>Try adjusting your search or filters</p>
        <button class="btn-reset" @click="clearFilters"><i class="bi bi-arrow-counterclockwise me-1"></i> Reset Filters</button>
      </div>

      <!-- Product Cards -->
      <div v-else :class="['product-row', viewMode === 'list' ? 'list-row' : '']">
        <ProductCard
          v-for="(product, idx) in filtered"
          :key="product._id"
          :product="product"
          :style="{ animationDelay: (idx * 60) + 'ms' }"
          class="product-card-anim"
          @view-details="openQuickView"
          @quick-view="openQuickView"
        />
      </div>
    </section>

    <!-- ░░ QUICK VIEW MODAL ░░ -->
    <teleport to="body">
      <transition name="modal-fade">
        <div v-if="quickProduct" class="qv-overlay" @click.self="closeQuickView">
          <div class="qv-modal">
            <button class="qv-close" @click="closeQuickView"><i class="bi bi-x-lg"></i></button>

            <div class="qv-left">
              <img
                :src="getImageUrl(quickProduct.image || '/uploads/default-product.png')"
                class="qv-img"
                :alt="quickProduct.name"
              />
            </div>

            <div class="qv-right">
              <span class="qv-cat">{{ quickProduct.category || 'General' }}</span>
              <h2 class="qv-name">{{ quickProduct.name }}</h2>
              <p class="qv-desc">{{ quickProduct.description || 'No description available.' }}</p>

              <div class="qv-price">
                {{ Number(quickProduct.price).toLocaleString('en-EG') }} <span class="qv-currency">EGP</span>
              </div>

              <div class="qv-meta">
                <div class="qv-meta-item" v-if="quickProduct.stock !== undefined">
                  <i class="bi bi-box-seam"></i>
                  <span>{{ quickProduct.stock > 0 ? quickProduct.stock + ' in stock' : 'Out of stock' }}</span>
                </div>
                <div class="qv-meta-item">
                  <i class="bi bi-tag"></i>
                  <span>{{ quickProduct.category || '—' }}</span>
                </div>
              </div>

              <button
                class="qv-cart-btn"
                :class="{ 'qv-added': quickAdded }"
                @click="quickAddToCart"
              >
                <span class="qv-default-text"><i class="bi bi-cart-plus"></i> Add to Cart</span>
                <span class="qv-added-text"><i class="bi bi-check-circle-fill"></i> Added to Cart!</span>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<style scoped>
/* ── Page ──────────────────────────────────────────────── */
.products-page {
  min-height: 100vh;
  background: linear-gradient(160deg, #f8f9ff 0%, #f0f4ff 50%, #fafbff 100%);
  padding-bottom: 80px;
}

/* ── Hero ──────────────────────────────────────────────── */
.products-hero {
  position: relative;
  padding: 72px 24px 52px;
  text-align: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #312e81 100%);
}
.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  pointer-events: none;
  opacity: .45;
}
.hero-glow-1 {
  width: 500px; height: 500px;
  background: radial-gradient(#6366f1, transparent 70%);
  top: -150px; left: -80px;
}
.hero-glow-2 {
  width: 400px; height: 400px;
  background: radial-gradient(#a78bfa, transparent 70%);
  bottom: -120px; right: -60px;
}
.products-hero-inner { position: relative; z-index: 2; }
.hero-eyebrow {
  font-size: 12.5px; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; color: #a5b4fc; margin-bottom: 14px;
}
.hero-title {
  font-size: clamp(28px, 5vw, 52px);
  font-weight: 900; color: #fff; margin: 0 0 14px; line-height: 1.15;
  letter-spacing: -1px;
}
.hero-highlight {
  background: linear-gradient(90deg, #818cf8, #c084fc);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub { font-size: 16px; color: #94a3b8; margin: 0; }

/* ── Controls Bar ──────────────────────────────────────── */
.controls-bar {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 2px 16px rgba(0,0,0,.05);
  position: sticky; top: 0; z-index: 100;
}
.controls-inner {
  max-width: 1400px; margin: 0 auto;
  display: flex; flex-wrap: wrap; align-items: center;
  gap: 10px; padding: 14px 20px;
}

/* Search */
.search-wrap {
  position: relative; flex: 1; min-width: 200px;
}
.search-icon {
  position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
  color: #94a3b8; font-size: 15px; pointer-events: none;
}
.search-input {
  width: 100%; padding: 9px 36px 9px 38px;
  border: 1.5px solid #e2e8f0; border-radius: 12px;
  font-size: 14px; font-family: inherit; color: #0f172a;
  background: #f8fafc;
  outline: none; transition: border .2s, box-shadow .2s;
}
.search-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,.12);
  background: #fff;
}
.search-clear {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  background: none; border: none; color: #94a3b8;
  cursor: pointer; font-size: 13px; padding: 2px 4px;
  transition: color .2s;
}
.search-clear:hover { color: #ef4444; }

/* Sort */
.sort-wrap { position: relative; min-width: 180px; }
.sort-icon {
  position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
  color: #94a3b8; font-size: 15px; pointer-events: none;
}
.sort-select {
  width: 100%; padding: 9px 12px 9px 34px;
  border: 1.5px solid #e2e8f0; border-radius: 12px;
  font-size: 14px; font-family: inherit;
  background: #f8fafc; color: #0f172a;
  outline: none; cursor: pointer;
  appearance: none;
  transition: border .2s;
}
.sort-select:focus { border-color: #6366f1; }

/* View toggle */
.view-toggle { display: flex; gap: 4px; }
.vtbtn {
  padding: 8px 11px;
  border: 1.5px solid #e2e8f0; border-radius: 10px;
  background: #f8fafc; color: #64748b;
  cursor: pointer; font-size: 15px;
  transition: all .2s;
}
.vtbtn.active {
  background: #6366f1; border-color: #6366f1; color: #fff;
}
.vtbtn:hover:not(.active) { border-color: #6366f1; color: #6366f1; }

/* Filter toggle btn */
.filter-toggle-btn {
  display: flex; align-items: center; gap: 7px;
  padding: 9px 16px;
  border: 1.5px solid #e2e8f0; border-radius: 12px;
  background: #f8fafc; color: #374151;
  font-size: 14px; font-weight: 600; cursor: pointer;
  position: relative; transition: all .2s;
}
.filter-toggle-btn:hover { border-color: #6366f1; color: #6366f1; }
.filter-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #ef4444; position: absolute; top: 7px; right: 7px;
}

/* Category Tabs */
.cat-tabs {
  display: flex; flex-wrap: wrap; gap: 6px;
  max-width: 1400px; margin: 0 auto;
  padding: 10px 20px 12px;
  overflow-x: auto;
}
.cat-tab {
  border: 1.5px solid #e2e8f0; border-radius: 30px;
  padding: 5px 16px;
  background: #f8fafc; color: #64748b;
  font-size: 13px; font-weight: 600;
  cursor: pointer; white-space: nowrap;
  display: flex; align-items: center; gap: 6px;
  transition: all .2s;
}
.cat-tab:hover { border-color: #6366f1; color: #6366f1; }
.cat-tab.active { background: #6366f1; border-color: #6366f1; color: #fff; }
.cat-count {
  font-size: 11px; font-weight: 700;
  background: rgba(255,255,255,.25);
  padding: 1px 7px; border-radius: 20px;
}
.cat-tab.active .cat-count { background: rgba(255,255,255,.3); }
.cat-tab:not(.active) .cat-count { background: #e2e8f0; color: #475569; }

/* Filter Panel */
.filter-panel {
  max-width: 1400px; margin: 0 auto;
  padding: 16px 20px;
  border-top: 1px solid #f1f5f9;
  display: flex; flex-wrap: wrap; align-items: flex-end; gap: 20px;
}
.fp-group { flex: 1; min-width: 220px; }
.fp-label { font-size: 13px; font-weight: 600; color: #374151; display: flex; gap: 5px; align-items: center; margin-bottom: 8px; }
.fp-range {
  width: 100%; accent-color: #6366f1; cursor: pointer;
}
.fp-range-limits { display: flex; justify-content: space-between; font-size: 11.5px; color: #94a3b8; margin-top: 4px; }
.fp-clear {
  padding: 8px 18px; border-radius: 10px;
  border: 1.5px solid #fca5a5; background: #fff5f5;
  color: #dc2626; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all .2s; white-space: nowrap;
}
.fp-clear:hover { background: #dc2626; color: #fff; border-color: #dc2626; }

.filter-slide-enter-active, .filter-slide-leave-active {
  transition: max-height .3s ease, opacity .3s ease;
  overflow: hidden;
  max-height: 200px;
}
.filter-slide-enter-from, .filter-slide-leave-to {
  max-height: 0; opacity: 0;
}

/* ── Results summary ───────────────────────────────────── */
.results-summary {
  max-width: 1400px; margin: 0 auto;
  padding: 14px 24px 4px;
  font-size: 13.5px; color: #64748b;
}

/* ── Products Grid ─────────────────────────────────────── */
.products-content {
  max-width: 1400px; margin: 0 auto;
  padding: 16px 14px;
}
.product-row {
  display: flex; flex-wrap: wrap; margin: -10px;
}
.list-row {
  flex-direction: column;
}

/* Card entrance animation */
.product-card-anim {
  animation: cardPop .45s cubic-bezier(.22,1,.36,1) both;
}
@keyframes cardPop {
  from { opacity: 0; transform: translateY(22px) scale(.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ── Skeleton ──────────────────────────────────────────── */
.skeleton-card {
  border-radius: 20px; overflow: hidden;
  background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,.06);
}
.sk-img { height: 210px; }
.sk-body { padding: 16px; }
.sk-line { border-radius: 8px; }
.shimmer {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

/* ── Empty State ───────────────────────────────────────── */
.empty-state {
  text-align: center; padding: 80px 20px;
}
.empty-icon { font-size: 64px; margin-bottom: 16px; }
.empty-state h3 { font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 8px; }
.empty-state p  { color: #64748b; margin-bottom: 20px; }
.btn-reset {
  padding: 10px 26px; border-radius: 12px;
  background: #6366f1; color: #fff;
  border: none; font-size: 14px; font-weight: 700;
  cursor: pointer; transition: all .25s;
}
.btn-reset:hover { background: #4f46e5; transform: scale(1.04); }

/* ── Quick View Modal ──────────────────────────────────── */
.qv-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(15,23,42,.65);
  backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.qv-modal {
  background: #fff;
  border-radius: 24px;
  display: flex;
  max-width: 840px; width: 100%;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0,0,0,.3);
  position: relative;
  max-height: 92vh;
}
.qv-close {
  position: absolute; top: 16px; right: 16px;
  background: rgba(15,23,42,.08); border: none;
  border-radius: 50%; width: 38px; height: 38px;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; color: #374151; cursor: pointer;
  transition: background .2s, color .2s; z-index: 2;
}
.qv-close:hover { background: #ef4444; color: #fff; }

.qv-left {
  width: 45%;
  background: #f1f5f9;
  flex-shrink: 0;
  overflow: hidden;
}
.qv-img { width: 100%; height: 100%; object-fit: cover; }

.qv-right {
  padding: 36px 32px;
  display: flex; flex-direction: column;
  overflow-y: auto; gap: 12px;
}
.qv-cat {
  font-size: 11.5px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1.5px;
  color: #6366f1;
}
.qv-name {
  font-size: 24px; font-weight: 900;
  color: #0f172a; line-height: 1.25; margin: 0;
}
.qv-desc { font-size: 14px; color: #64748b; line-height: 1.65; margin: 0; }
.qv-price {
  font-size: 30px; font-weight: 900; color: #0f172a; letter-spacing: -1px;
}
.qv-currency { font-size: 14px; font-weight: 600; color: #64748b; }
.qv-meta { display: flex; flex-direction: column; gap: 8px; }
.qv-meta-item {
  display: flex; align-items: center; gap: 8px;
  font-size: 13.5px; color: #475569;
}
.qv-meta-item i { color: #6366f1; font-size: 15px; }

.qv-cart-btn {
  position: relative; overflow: hidden;
  border: none; border-radius: 14px;
  padding: 14px 24px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff; font-size: 15px; font-weight: 800;
  cursor: pointer; transition: all .25s;
  display: flex; align-items: center; justify-content: center;
  gap: 8px; min-height: 52px; margin-top: auto;
}
.qv-cart-btn:hover {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  box-shadow: 0 8px 24px rgba(99,102,241,.35); transform: scale(1.02);
}
.qv-default-text, .qv-added-text {
  display: flex; align-items: center; gap: 8px;
  position: absolute; transition: opacity .25s, transform .25s;
}
.qv-default-text { opacity: 1; transform: translateY(0); }
.qv-added-text   { opacity: 0; transform: translateY(8px); }
.qv-added .qv-default-text { opacity: 0; transform: translateY(-8px); }
.qv-added .qv-added-text   { opacity: 1; transform: translateY(0); }

/* Modal transition */
.modal-fade-enter-active { transition: all .3s cubic-bezier(.22,1,.36,1); }
.modal-fade-leave-active { transition: all .2s ease; }
.modal-fade-enter-from { opacity: 0; }
.modal-fade-enter-from .qv-modal { transform: scale(.92) translateY(20px); }
.modal-fade-leave-to { opacity: 0; }

@media (max-width: 640px) {
  .qv-modal { flex-direction: column; }
  .qv-left  { width: 100%; height: 220px; }
  .qv-right { padding: 20px; }
}
</style>
