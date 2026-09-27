<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from './components/Footer.vue'
import { useShoppingList } from '@/composables/useShoppingList'

const { toastMessage } = useShoppingList()
</script>

<template>
  <div class="app">
    <Header />
    <RouterView />
    <Footer />
    <div v-if="toastMessage" class="toast">{{ toastMessage }}</div>
  </div>
</template>

<style scoped>
.app {
  width: 100%;
}
</style>
