import { computed, ref } from 'vue'
import type { ShoppingItem } from '@/types/market'

const STORAGE_KEY = 'marketmate-list'

function readList(): ShoppingItem[] {
  const fallback: ShoppingItem[] = [
    { id: 'milk', qty: 2 },
    { id: 'eggs', qty: 1 },
    { id: 'bread', qty: 1 },
    { id: 'coffee', qty: 1 },
  ]
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return fallback
    const parsed = JSON.parse(stored) as ShoppingItem[]
    if (!Array.isArray(parsed)) return fallback
    return parsed
  } catch {
    return fallback
  }
}

const items = ref<ShoppingItem[]>(readList())
const toastMessage = ref('')
let toastTimer = 0

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
}

function showToast(message: string) {
  toastMessage.value = message
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    toastMessage.value = ''
  }, 1900)
}

export function useShoppingList() {
  const count = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))

  function addProduct(id: string) {
    const found = items.value.find((item) => item.id === id)
    if (found) found.qty += 1
    else items.value.push({ id, qty: 1 })
    persist()
    showToast('Added to your shopping list')
  }

  function changeQty(id: string, delta: number) {
    const found = items.value.find((item) => item.id === id)
    if (!found) return
    found.qty += delta
    items.value = items.value.filter((item) => item.qty > 0)
    persist()
  }

  function addNote(name: string) {
    const text = name.trim()
    if (!text) return
    showToast(`“${text}” added as a note`)
  }

  return { items, count, toastMessage, addProduct, changeQty, addNote }
}

export function formatPrice(value: number) {
  return `$${Number(value).toFixed(2)}`
}
