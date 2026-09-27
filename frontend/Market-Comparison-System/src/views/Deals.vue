<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getDeals } from '@/api/marketApi'
import { formatPrice } from '@/composables/useShoppingList'
import type { Product } from '@/types/market'

const router = useRouter()
const deals = ref<Product[]>([])
const category = ref('All')
const filters = [
  { label: 'All deals', value: 'All' },
  { label: 'Dairy & eggs', value: 'Dairy' },
  { label: 'Pantry', value: 'Pantry' },
  { label: 'Household', value: 'Household' },
  { label: 'Fresh produce', value: 'Fruit' },
]

const shown = computed(() =>
  category.value === 'All' ? deals.value : deals.value.filter((item) => item.category === category.value),
)

onMounted(async () => {
  deals.value = await getDeals()
})
</script>

<template>
  <div class="page">
    <section class="page-hero">
      <div class="page-wrap">
        <div class="breadcrumb"><router-link to="/">Home</router-link> / Deals</div>
        <h1 class="page-title">Deals worth comparing</h1>
        <p class="page-lead">Current specials with a meaningful saving against the usual shelf price.</p>
      </div>
    </section>
    <section class="page-wrap">
      <div class="chips">
        <button v-for="item in filters" :key="item.value" type="button" :class="{ active: category === item.value }" @click="category = item.value">
          {{ item.label }}
        </button>
      </div>
      <div class="grid">
        <article v-for="item in shown" :key="item.id" class="panel card" @click="router.push(`/product/${item.id}`)">
          <div class="media">{{ item.icon }}</div>
          <div class="body">
            <div class="top">
              <span :class="`cls-${item.cls}`">{{ item.retailer }}</span>
              <strong>Save {{ item.saving }}%</strong>
            </div>
            <h2>{{ item.name }}</h2>
            <div class="price"><span>{{ formatPrice(item.price) }}</span><s>{{ formatPrice(item.was) }}</s></div>
            <p>{{ item.unit }}</p>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.chips { display: flex; gap: 10px; flex-wrap: wrap; margin: 28px 0 18px; }
.chips button { border: 0; background: #fff; color: #38564b; border-radius: 999px; padding: 8px 14px; cursor: pointer; }
.chips button.active { background: #123c2d; color: #fff; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.card { overflow: hidden; cursor: pointer; }
.media { height: 140px; background: #e7f4ec; display: grid; place-items: center; font-size: 48px; }
.body { padding: 16px; }
.top, .price { display: flex; justify-content: space-between; align-items: baseline; }
h2 { margin: 8px 0; font-size: 20px; }
.price span { font-size: 24px; font-weight: 700; }
s, p { color: #8aa198; }
.top strong { color: #176b4b; }
@media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
</style>
