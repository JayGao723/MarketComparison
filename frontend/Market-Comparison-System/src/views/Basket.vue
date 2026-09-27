<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getProduct } from '@/api/marketApi'
import { formatPrice, useShoppingList } from '@/composables/useShoppingList'

const { items } = useShoppingList()
const best = ref(0)
const count = computed(() => items.value.length)
const stores = computed(() => {
  const pns = best.value + 3.12
  const woolworths = best.value + 4.83
  const newWorld = best.value + 7.46
  return [
    { name: "PAK'nSAVE Albany", total: pns, note: `All ${count.value} products available`, winner: true },
    { name: 'Woolworths Albany', total: woolworths, note: `${formatPrice(woolworths - pns)} more`, winner: false },
    { name: 'New World Albany', total: newWorld, note: `${formatPrice(newWorld - pns)} more`, winner: false },
  ]
})

onMounted(async () => {
  let sum = 0
  for (const item of items.value) {
    const product = await getProduct(item.id)
    if (product) sum += product.price * item.qty
  }
  best.value = sum
})
</script>

<template>
  <div class="page">
    <section class="page-hero">
      <div class="page-wrap">
        <div class="breadcrumb">
          <router-link to="/">Home</router-link> /
          <router-link to="/shopping-list">Shopping list</router-link> /
          Basket comparison
        </div>
        <h1 class="page-title">Basket comparison</h1>
        <p class="page-lead">Compare one-store convenience with the lowest possible split basket.</p>
      </div>
    </section>
    <section class="page-wrap layout">
      <div class="stores">
        <article v-for="store in stores" :key="store.name" class="panel card" :class="{ winner: store.winner }">
          <span>{{ store.winner ? 'Best single store' : 'One trip' }}</span>
          <h3>{{ store.name }}</h3>
          <strong>{{ formatPrice(store.total) }}</strong>
          <p>{{ store.note }}</p>
        </article>
      </div>
      <aside class="panel split">
        <h3>Cheapest split basket</h3>
        <p>Buy each item where it is cheapest. This requires three stops.</p>
        <strong>{{ formatPrice(best) }}</strong>
        <div>Woolworths · milk and laundry liquid</div>
        <div>PAK'nSAVE · eggs and bread</div>
        <div>New World · coffee</div>
        <router-link to="/shopping-list">Edit shopping list</router-link>
      </aside>
    </section>
  </div>
</template>

<style scoped>
.layout { display: grid; grid-template-columns: 1fr 320px; gap: 20px; margin-top: 28px; }
.stores { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.card, .split { padding: 20px; }
.card.winner { outline: 2px solid #176b4b; }
.card span, .split p { color: #547066; }
.card strong, .split strong { display: block; font-size: 32px; margin: 8px 0; }
.split div { padding: 8px 0; border-top: 1px solid #e8f0ec; }
.split a { display: block; margin-top: 16px; text-align: center; background: #fff; color: #123c2d; border: 1px solid #d5ebdd; border-radius: 999px; padding: 10px; text-decoration: none; }
@media (max-width: 900px) { .layout, .stores { grid-template-columns: 1fr; } }
</style>
