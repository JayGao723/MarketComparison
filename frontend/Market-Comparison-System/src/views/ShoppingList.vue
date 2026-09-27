<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getProduct } from '@/api/marketApi'
import { formatPrice, useShoppingList } from '@/composables/useShoppingList'
import type { Product } from '@/types/market'

const note = ref('')
const rows = ref<Array<{ qty: number; product: Product }>>([])
const { items, changeQty, addNote } = useShoppingList()

const total = computed(() => rows.value.reduce((sum, row) => sum + row.product.price * row.qty, 0))
const itemCount = computed(() => rows.value.reduce((sum, row) => sum + row.qty, 0))

async function load() {
  const next = []
  for (const item of items.value) {
    const product = await getProduct(item.id)
    if (product) next.push({ qty: item.qty, product })
  }
  rows.value = next
}

function updateQty(id: string, delta: number) {
  changeQty(id, delta)
  void load()
}

function submitNote() {
  addNote(note.value)
  note.value = ''
}

onMounted(load)
</script>

<template>
  <div class="page">
    <section class="page-hero">
      <div class="page-wrap">
        <div class="breadcrumb"><router-link to="/">Home</router-link> / Shopping list</div>
        <h1 class="page-title">Your shopping list</h1>
        <p class="page-lead">Build your basket once, then compare the total across all three supermarkets.</p>
      </div>
    </section>
    <section class="page-wrap layout">
      <div class="panel list">
        <template v-if="rows.length">
          <div class="head"><span>Product</span><span>Quantity</span><span>Best price</span></div>
          <div v-for="row in rows" :key="row.product.id" class="row">
            <div class="main">
              <div class="icon">{{ row.product.icon }}</div>
              <div>
                <strong>{{ row.product.name }}</strong>
                <p>Best at {{ row.product.retailer }} · {{ row.product.unit }}</p>
              </div>
            </div>
            <div class="qty">
              <button type="button" @click="updateQty(row.product.id, -1)">−</button>
              <strong>{{ row.qty }}</strong>
              <button type="button" @click="updateQty(row.product.id, 1)">+</button>
            </div>
            <div>{{ formatPrice(row.product.price * row.qty) }}</div>
          </div>
        </template>
        <div v-else class="empty">
          <h2>Your list is empty</h2>
          <p>Add products from Compare or Deals. Your list is stored only in this browser.</p>
          <router-link to="/compare">Find products</router-link>
        </div>
        <form class="add" @submit.prevent="submitNote">
          <input v-model="note" aria-label="New grocery item" placeholder="Add a grocery item..." />
          <button type="submit">Add item</button>
        </form>
      </div>
      <aside class="panel summary">
        <h3>Best-price estimate</h3>
        <div><span>{{ itemCount }} items</span><strong>{{ formatPrice(total) }}</strong></div>
        <div><span>Estimated savings</span><strong>$5.72</strong></div>
        <div class="total"><span>Current total</span><strong>{{ formatPrice(total) }}</strong></div>
        <router-link v-if="rows.length" to="/basket">Compare basket</router-link>
        <p>Saved locally on this device. No login required.</p>
      </aside>
    </section>
  </div>
</template>

<style scoped>
.layout { display: grid; grid-template-columns: 1fr 320px; gap: 20px; margin-top: 28px; }
.list, .summary { padding: 20px; }
.head, .row, .summary div { display: grid; grid-template-columns: 1fr 140px 100px; gap: 12px; align-items: center; }
.head { color: #6d827a; font-size: 13px; margin-bottom: 8px; }
.row { padding: 14px 0; border-top: 1px solid #e8f0ec; }
.main { display: flex; gap: 12px; align-items: center; }
.icon { width: 44px; height: 44px; border-radius: 12px; background: #e7f4ec; display: grid; place-items: center; }
.main p, .summary p, .empty p { color: #547066; margin: 4px 0 0; }
.qty { display: flex; align-items: center; gap: 8px; }
.qty button, .add button, .empty a, .summary a { border: 0; background: #176b4b; color: #fff; border-radius: 999px; padding: 8px 12px; text-decoration: none; cursor: pointer; }
.add { display: flex; gap: 10px; margin-top: 16px; }
.add input { flex: 1; border: 1px solid #d5ebdd; border-radius: 12px; padding: 10px 12px; }
.summary div { grid-template-columns: 1fr auto; padding: 10px 0; }
.summary .total { font-size: 20px; }
.summary a { display: block; text-align: center; margin-top: 16px; }
.empty { text-align: center; padding: 24px 0; }
@media (max-width: 900px) { .layout, .head, .row { grid-template-columns: 1fr; } }
</style>
