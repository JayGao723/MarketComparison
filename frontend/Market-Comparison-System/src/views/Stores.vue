<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getStores } from '@/api/marketApi'
import type { StoreInfo } from '@/types/market'

const stores = ref<StoreInfo[]>([])

onMounted(async () => {
  stores.value = await getStores()
})
</script>

<template>
  <div class="page">
    <section class="page-hero">
      <div class="page-wrap">
        <div class="breadcrumb"><router-link to="/">Home</router-link> / Stores</div>
        <h1 class="page-title">Selected Albany stores</h1>
        <p class="page-lead">Prices are matched to one nearby branch from each supermarket for a fair local comparison.</p>
      </div>
    </section>
    <section class="page-wrap grid">
      <article v-for="store in stores" :key="store.id" class="panel card">
        <div class="logo" :class="`bg-${store.cls}`">{{ store.logo }}</div>
        <h3>{{ store.name }}</h3>
        <p>{{ store.address }}</p>
        <div class="meta"><span>{{ store.updated }}</span><strong>Selected</strong></div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 28px; }
.card { padding: 24px; }
.logo { width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center; color: #fff; font-weight: 700; margin-bottom: 16px; }
.bg-pns { background: #f5c518; color: #123c2d; }
.bg-ww { background: #176b4b; }
.bg-nw { background: #c41e3a; }
p { color: #547066; }
.meta { display: flex; justify-content: space-between; }
@media (max-width: 800px) { .grid { grid-template-columns: 1fr; } }
</style>
