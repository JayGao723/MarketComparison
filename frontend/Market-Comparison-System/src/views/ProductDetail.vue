<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getProduct } from '@/api/marketApi'
import { formatPrice, useShoppingList } from '@/composables/useShoppingList'
import type { Product } from '@/types/market'

const route = useRoute()
const product = ref<Product | null>(null)
const { addProduct } = useShoppingList()

async function load() {
  product.value = await getProduct(String(route.params.id || ''))
}

function add(id: string) {
  addProduct(id)
}

watch(() => route.params.id, load)
onMounted(load)
</script>

<template>
  <div class="page">
    <section class="page-hero">
      <div class="page-wrap breadcrumb">
        <router-link to="/">Home</router-link> /
        <router-link to="/compare">Compare</router-link> /
        {{ product?.name || 'Product' }}
      </div>
    </section>
    <section v-if="product" class="page-wrap detail">
      <div class="media">{{ product.icon }}</div>
      <div>
        <div class="kicker">{{ product.category }}</div>
        <h1>{{ product.name }}</h1>
        <p>{{ product.pack }} · prices checked today around Albany</p>
        <article v-for="(offer, index) in product.offers" :key="offer.store" class="panel offer" :class="{ best: index === 0 }">
          <div>
            <strong>{{ offer.store }}</strong>
            <p>{{ offer.branch }} · {{ offer.inStock ? 'In stock' : 'Limited stock' }}</p>
          </div>
          <div class="price">
            <strong>{{ formatPrice(offer.price) }}</strong>
            <span>{{ product.unit }}</span>
          </div>
          <button type="button" :class="{ secondary: index > 0 }" @click="add(product.id)">
            {{ index === 0 ? 'Add best price' : 'Add to list' }}
          </button>
        </article>
      </div>
    </section>
    <section v-if="product" class="page-wrap">
      <div class="panel history">
        <div>
          <h3>30-day price history</h3>
          <p>Lowest observed price across selected Albany stores</p>
        </div>
        <span>Down {{ product.saving }}%</span>
      </div>
    </section>
    <section v-else class="page-wrap panel empty">
      <h1>Product not found</h1>
      <router-link to="/compare">Back to compare</router-link>
    </section>
  </div>
</template>

<style scoped>
.detail { display: grid; grid-template-columns: 280px 1fr; gap: 28px; margin-top: 28px; }
.media { height: 280px; border-radius: 20px; background: #e7f4ec; display: grid; place-items: center; font-size: 84px; }
.kicker { color: #176b4b; font-weight: 700; }
h1 { margin: 6px 0; font-size: 40px; }
p { color: #547066; }
.offer { display: grid; grid-template-columns: 1fr auto auto; gap: 16px; align-items: center; padding: 16px 18px; margin-bottom: 12px; }
.offer.best { outline: 2px solid #176b4b; }
.price { text-align: right; }
.price strong { display: block; font-size: 24px; }
button { border: 0; background: #176b4b; color: #fff; border-radius: 999px; padding: 10px 16px; cursor: pointer; }
button.secondary { background: #fff; color: #123c2d; border: 1px solid #d5ebdd; }
.history { margin-top: 24px; padding: 20px 24px; display: flex; justify-content: space-between; }
.history h3 { margin: 0; }
.history span { background: #e7f4ec; color: #176b4b; border-radius: 999px; padding: 6px 10px; height: fit-content; }
.empty { margin-top: 28px; padding: 40px; }
@media (max-width: 800px) { .detail, .offer { grid-template-columns: 1fr; } }
</style>
