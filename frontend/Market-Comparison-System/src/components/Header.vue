<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Logomark from '@/assets/imgs/Logomark.png'
import Signature from '@/assets/imgs/sig.png'
import { useShoppingList } from '@/composables/useShoppingList'

const route = useRoute()
const router = useRouter()
const { count } = useShoppingList()

const menus = [
  { path: '/compare', label: 'Compare' },
  { path: '/deals', label: 'Deals' },
  { path: '/shopping-list', label: 'Shopping list' },
] as const

function navigateTo(path: string) {
  void router.push(path)
}

function isActive(path: string) {
  if (path === '/compare') return route.path === '/compare' || route.path.startsWith('/product')
  if (path === '/shopping-list') return route.path === '/shopping-list' || route.path === '/basket'
  return route.path === path
}
</script>

<template>
  <div class="header">
    <button class="header-title" type="button" @click="navigateTo('/')">
      <img :src="Logomark" alt="Logomark" class="logomark" />
      MarketMate
      <img :src="Signature" alt="Signature" class="Signature" />
    </button>
    <div class="header-menu">
      <el-button
        v-for="item in menus"
        :key="item.path"
        text
        class="header-menu-item"
        :class="{ 'is-menu-active': isActive(item.path) }"
        @click="navigateTo(item.path)"
      >
        {{ item.label }}
        <span v-if="item.path === '/shopping-list'" class="list-count">{{ count }}</span>
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.header {
  padding: 20px 72px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
.header-title {
  font-size: 20px;
  font-weight: bold;
  color: #17352b;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
}
.list-count {
  margin-left: 6px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: #176b4b;
  color: #fff;
  font-size: 12px;
  line-height: 18px;
}
.logomark {
  height: 32px;
  width: 32px;
  display: block;
}
.Signature {
  height: 52px;
  width: 175px;
}
.header-menu {
  display: flex;
  align-items: center;
  gap: 16px;
}
.header-menu :deep(.header-menu-item) {
  --el-button-text-color: #547066;
  --el-button-hover-text-color: #547066;
  --el-button-hover-bg-color: transparent;
  --el-button-hover-border-color: transparent;
  --el-button-active-text-color: #547066;
  --el-button-active-bg-color: transparent;
  --el-button-active-border-color: transparent;
  --el-button-bg-color: transparent;
  --el-button-border-color: transparent;
  border: none;
  background: transparent;
  box-shadow: none;
  color: #547066;
  font-family: Inter, sans-serif;
  font-weight: 400;
}
.header-menu :deep(.header-menu-item:hover),
.header-menu :deep(.header-menu-item:focus),
.header-menu :deep(.header-menu-item:focus-visible) {
  font-weight: 400;
  color: #547066;
  background: transparent;
  border: none;
  box-shadow: none;
}
.header-menu :deep(.header-menu-item.is-menu-active) {
  font-weight: 700;
}
</style>
