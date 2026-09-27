<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchProducts } from '@/api/marketApi'
import { formatPrice } from '@/composables/useShoppingList'
import type { Product } from '@/types/market'

const route = useRoute()
const router = useRouter()
const keyword = ref(String(route.query.q || 'milk'))
const products = ref<Product[]>([])
const loading = ref(false)
const stores = ref(["PAK'nSAVE", 'Woolworths', 'New World'])
const specialsOnly = ref(false)
const sortBy = ref('price')

const shown = computed(() => {
  const selected = new Set(stores.value)
  let list = products.value.filter((product) => selected.has(product.retailer))
  if (specialsOnly.value) list = list.filter((product) => product.saving > 0)
  if (sortBy.value === 'saving') list = [...list].sort((a, b) => b.saving - a.saving)
  else if (sortBy.value === 'unit') list = [...list].sort((a, b) => a.unit.localeCompare(b.unit))
  else list = [...list].sort((a, b) => a.price - b.price)
  return list
})

async function load() {
  loading.value = true
  try {
    products.value = await searchProducts(keyword.value)
  } finally {
    loading.value = false
  }
}

function onSearch() {
  void router.push({ path: '/compare', query: { q: keyword.value.trim() || 'milk' } })
}

function openProduct(id: string) {
  void router.push(`/product/${id}`)
}

watch(
  () => route.query.q,
  (value) => {
    keyword.value = String(value || 'milk')
    void load()
  },
)

onMounted(load)
</script>

<template>
  <div class="page">
    <section class="page-hero">
      <div class="page-wrap">
        <div class="breadcrumb"><router-link to="/">Home</router-link> / Compare</div>
        <h1 class="page-title">Compare grocery prices</h1>
        <p class="page-lead">See the cheapest current offer, unit price and nearby store for every product.</p>
        <form class="compare-search" @submit.prevent="onSearch">
          <input v-model="keyword" aria-label="Search products" placeholder="Search milk, bread, coffee, detergent..." />
          <button type="submit">Compare</button>
        </form>
      </div>
    </section>
    <section class="page-wrap compare-layout">
      <aside class="panel filters">
        <div class="filter-title"><strong>Filters</strong><button type="button" @click="stores = ['PAK\'nSAVE', 'Woolworths', 'New World']; specialsOnly = false">Clear all</button></div>
        <div class="filter-label">Supermarket</div>
        <label v-for="store in ['PAK\'nSAVE', 'Woolworths', 'New World']" :key="store"><input v-model="stores" type="checkbox" :value="store" /> {{ store }}</label>
        <div class="filter-label">Availability</div>
        <label><input v-model="specialsOnly" type="checkbox" /> Specials only</label>
      </aside>
      <div>
        <div class="results-bar">
          <strong>{{ shown.length }} results for “{{ keyword }}”</strong>
          <select v-model="sortBy" aria-label="Sort results">
            <option value="price">Lowest price</option>
            <option value="saving">Biggest saving</option>
            <option value="unit">Unit price</option>
          </select>
        </div>
        <div v-if="loading" class="panel empty">Loading results...</div>
        <div v-else-if="!shown.length" class="panel empty">
          <h2>No matches for “{{ keyword }}”</h2>
          <p>Try a broader product name or remove one of your filters.</p>
          <button type="button" @click="keyword = 'milk'; onSearch()">Search milk</button>
        </div>
        <article v-for="product in shown" :key="product.id" class="panel result" @click="openProduct(product.id)">
          <div class="media">{{ product.icon }}</div>
          <div>
            <h2>{{ product.name }}</h2>
            <p>{{ product.pack }} · {{ product.category }}</p>
            <span class="pill">{{ product.saving }}% below usual</span>
          </div>
          <div class="offers">
            <div v-for="offer in product.offers" :key="offer.store">
              <span :class="`cls-${offer.cls}`">{{ offer.store }}</span>
              <strong>{{ formatPrice(offer.price) }}</strong>
            </div>
          </div>
          <div class="best">
            <strong>{{ formatPrice(product.price) }}</strong>
            <span>{{ product.unit }}</span>
            <em>Lowest</em>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.compare-search { display: flex; gap: 12px; margin-top: 22px; background: #fff; border-radius: 999px; padding: 8px 8px 8px 18px; max-width: 720px; }
.compare-search input { flex: 1; border: 0; outline: none; font-size: 16px; }
.compare-search button, .empty button, .filters button { border: 0; border-radius: 999px; background: #176b4b; color: #fff; padding: 10px 18px; cursor: pointer; }
.compare-layout { display: grid; grid-template-columns: 260px 1fr; gap: 20px; margin-top: 28px; }
.filters { padding: 20px; display: flex; flex-direction: column; gap: 10px; color: #38564b; }
.filter-title { display: flex; justify-content: space-between; }
.filters button { background: transparent; color: #176b4b; padding: 0; }
.filter-label { margin-top: 8px; font-weight: 700; }
.results-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.results-bar select { border: 1px solid #d5ebdd; border-radius: 10px; padding: 8px 10px; background: #fff; }
.result { display: grid; grid-template-columns: 72px 1.2fr 1fr 120px; gap: 16px; align-items: center; padding: 16px; margin-bottom: 12px; cursor: pointer; }
.media { width: 72px; height: 72px; border-radius: 12px; background: #e7f4ec; display: grid; place-items: center; font-size: 28px; }
.result h2 { margin: 0; font-size: 18px; }
.result p { margin: 4px 0; color: #547066; }
.pill, .best em { background: #e7f4ec; color: #176b4b; border-radius: 999px; padding: 3px 8px; font-size: 12px; font-style: normal; }
.offers div { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 6px; }
.best { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
.best strong { font-size: 22px; }
.empty { padding: 40px; text-align: center; }
@media (max-width: 900px) {
  .compare-layout, .result { grid-template-columns: 1fr; }
}
</style>
