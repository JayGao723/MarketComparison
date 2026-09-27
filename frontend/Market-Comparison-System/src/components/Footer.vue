<script setup lang="ts">
import { useRouter } from 'vue-router'
import Logomark from '@/assets/imgs/Logomark.png'
import Signature from '@/assets/imgs/sig.png'

const router = useRouter()

function navigateTo(path: string) {
  void router.push(path)
}
</script>

<template>
  <div class="header">
    <div class="header-title">
      <img :src="Logomark" alt="Logomark" class="logomark" />
      MarketMate
    </div>
    <div class="footer-links">
      <button type="button" @click="navigateTo('/compare')">Compare prices</button>
      <span>•</span>
      <button type="button" @click="navigateTo('/shopping-list')">Build lists</button>
      <span>•</span>
      <button type="button" @click="navigateTo('/stores')">Stores</button>
      <span>•</span>
      <span>Spend less</span>
      <span>•</span>
      <button type="button" @click="navigateTo('/data-info')">Data information</button>
    </div>
    <img :src="Signature" alt="Signature" class="Signature" />
  </div>
</template>

<style scoped>
.header {
  padding: 20px 72px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
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
.footer-links {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6d827a;
  font-size: 13px;
}
.footer-links button {
  border: 0;
  background: transparent;
  color: #6d827a;
  font-size: 13px;
  cursor: pointer;
  padding: 0;
}
</style>
