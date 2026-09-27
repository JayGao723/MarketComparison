<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PaknSaveLogo from '@/assets/imgs/paknsave.png'
import WoolworthLogo from '@/assets/imgs/woolworth.png'
import NewWorldLogo from '@/assets/imgs/newworld.png'
import { getTrendingProducts } from '@/api/marketApi'
import { formatPrice } from '@/composables/useShoppingList'
import type { Product } from '@/types/market'

const router = useRouter()
const keyword = ref('')
const brandsSource = [
  { brand: 'PAKnSAVE', logo: PaknSaveLogo },
  { brand: 'Woolworth', logo: WoolworthLogo },
  { brand: 'New World', logo: NewWorldLogo },
]

const supermarketTotals = [
  { name: "PAK'nSAVE", note: 'Lowest', price: 82.4, lowest: true },
  { name: 'Woolworths', note: '+$3.70', price: 86.1, lowest: false },
  { name: 'New World', note: '+$7.55', price: 89.95, lowest: false },
]

const features = [
  {
    icon: 'swap',
    title: 'Compare instantly',
    desc: 'See prices side by side across major NZ supermarkets.',
  },
  {
    icon: 'percent',
    title: 'Spot real value',
    desc: 'Compare pack size and unit price, not just the sticker price.',
  },
  {
    icon: 'check',
    title: 'Build your list',
    desc: 'Save products and see which store gives you the lowest total.',
  },
] as const

const trendingProducts = ref<Product[]>([])

function storeClass(store: string) {
  if (store === 'Woolworths') return 'store-woolworths'
  if (store === "PAK'nSAVE") return 'store-paknsave'
  return 'store-newworld'
}

async function fetchTrendingProducts() {
  trendingProducts.value = await getTrendingProducts()
}

function onCompare() {
  void router.push({ path: '/compare', query: { q: keyword.value.trim() || 'milk' } })
}

function openProduct(id: string) {
  void router.push(`/product/${id}`)
}

onMounted(() => {
  void fetchTrendingProducts()
})
</script>

<template>
    <div class="home">
        <div class="home-content">
            <div class="home-content-title">
                <div class="title-box">SMARTER GROCERY SHOPPING</div>
                <div class="big-title">
                    <div>Compare supermarket prices</div>
                    <div>before you shop</div>
                </div>
                <div class="sub-title">
                    <div>Find the lowest price across New Zealand supermarkets and build a cheaper shopping</div>
                    <div>list in seconds.</div>
                </div>
                <form class="search-bar" @submit.prevent="onCompare">
                    <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2" />
                        <path d="M20 20L16.5 16.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    <input
                        v-model="keyword"
                        class="search-input"
                        type="search"
                        placeholder="Search milk, bread, coffee, detergent..."
                    />
                    <button class="compare-btn" type="submit">Compare</button>
                </form>
                <div class="brands">
                    <div v-for="item in brandsSource" :key="item.brand" class="brand-item">
                        <img :src="item.logo" :alt="item.brand" class="logo" />
                        <div>{{ item.brand }}</div>
                    </div>
                </div>
            </div>
            <div class="shopping-list">
                <div>
                    <div style="font-size: 32px;font-weight: bold;color: #FFFFFF;">
                        One shopping list.
                    </div>
                    <div style="font-size: 32px;font-weight: bold;color: #FFFFFF;margin-bottom: 20px;">
                        Three supermarket totals.
                    </div>
                    <div style="font-size: 15px;color: #FFFFFF;">Add the products you need and instantly see which supermarket gives you</div>
                    <div style="font-size: 15px;color: #FFFFFF;margin-bottom: 30px;">the cheapest basket.</div>
                    <el-button class="build-list-btn" @click="router.push('/shopping-list')">Build a Shopping List</el-button>
                </div>
                <div class="totals-panel">
                    <div
                        v-for="item in supermarketTotals"
                        :key="item.name"
                        class="total-card"
                        :class="{ 'is-lowest': item.lowest }"
                    >
                        <div>
                            <div class="total-name">{{ item.name }}</div>
                            <div class="total-note">{{ item.note }}</div>
                        </div>
                        <div class="total-price">{{ formatPrice(item.price) }}</div>
                    </div>
                </div>
            </div>
            <section class="home-section">
                <h2 class="section-title">Shop smarter, not harder</h2>
                <p class="section-desc">Compare real supermarket prices, spot better value, and plan a cheaper basket.</p>
                <div class="feature-grid">
                    <article v-for="item in features" :key="item.title" class="feature-card">
                        <div class="feature-icon" aria-hidden="true">
                            <svg v-if="item.icon === 'swap'" viewBox="0 0 24 24">
                                <path d="M7 8h11M15 5l3 3-3 3M17 16H6M9 13l-3 3 3 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <svg v-else-if="item.icon === 'percent'" viewBox="0 0 24 24">
                                <circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="2" />
                                <circle cx="16" cy="16" r="2" fill="none" stroke="currentColor" stroke-width="2" />
                                <path d="M17 7L7 17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            </svg>
                            <svg v-else viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2" />
                                <path d="M8.5 12.5l2.5 2.5 4.5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h3 class="feature-title">{{ item.title }}</h3>
                        <p class="feature-desc">{{ item.desc }}</p>
                    </article>
                </div>
            </section>
            <section class="home-section trending-section">
                <div class="section-heading">
                    <div>
                        <h2 class="section-title">Trending price drops</h2>
                        <p class="section-desc">A quick view of products currently worth comparing.</p>
                    </div>
                    <button class="view-all" type="button" @click="router.push('/deals')">View all deals →</button>
                </div>
                <div class="trending-grid">
                    <article v-for="item in trendingProducts" :key="item.id" class="deal-card" @click="openProduct(item.id)">
                        <div class="product-thumb">
                            <span>{{ item.icon }}</span>
                        </div>
                        <div class="deal-store" :class="storeClass(item.retailer)">{{ item.retailer }}</div>
                        <div class="deal-name">{{ item.name }}</div>
                        <div class="deal-price">
                            <span>{{ formatPrice(item.price) }}</span>
                            <span class="from-price">from {{ formatPrice(item.was) }}</span>
                        </div>
                        <span class="best-price">Best price</span>
                    </article>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
.home {
    width: 100%;
    min-height: 100%;
    background-color:#F7FAF8;
    padding-bottom: 64px;
}
.home-content-title {
    display:flex;
    align-items:center;
    padding-top: 72px;
    background-color: #E8F4EE;
    height: 520px;
    flex-direction: column;

}

.title-box {
    font-size: 12px;
    font-weight: 700;
    color: #176B4B;
    background-color: #D5EBDD;
    width:210px;
    height:29px;    
    line-height:29px;
    display:flex;
    align-items:center;
    border-radius:10px;
    flex-direction: column;
    }
.big-title{
    color:#11392B;
    font-size: 52px;
    text-align: center;
    font-weight: bold;
}
.sub-title{
    text-align: center;
    color: #547066;
    font-size: 18px;
    margin-top: 24px;
}
.search-bar {
    display: flex;
    align-items: center;
    width: min(760px, calc(100% - 48px));
    margin-top: 32px;
    padding: 8px 8px 8px 20px;
    background: #fff;
    border-radius: 999px;
    box-shadow: 0 8px 24px rgba(17, 57, 43, 0.06);
}
.search-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    color: #7A948A;
}
.search-input {
    flex: 1;
    min-width: 0;
    margin: 0 12px;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    color: #17352B;
    font-family: Inter, sans-serif;
}
.search-input::placeholder {
    color: #8AA198;
}
.search-input::-webkit-search-decoration,
.search-input::-webkit-search-cancel-button {
    appearance: none;
}
.compare-btn {
    flex-shrink: 0;
    height: 44px;
    padding: 0 28px;
    border: none;
    border-radius: 999px;
    background: #176B4B;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    font-family: Inter, sans-serif;
    cursor: pointer;
}
.compare-btn:hover {
    background: #145C40;
}
.brands {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    margin-top: 28px;
}
.brand-item {
    display: flex;
    align-items: center;
    background-color: #FFFFFF;
    color: #38564B;
    font-size: 13px;
    padding: 0 20px;
    border-radius: 10px;
}
.logo {
    height: 26px;
    width: auto;
    display: block;
    object-fit: contain;
    margin-right: 10px;
}
.shopping-list{
    height: 285px;
    width: 1296px;
    background-color: #123C2D;
    border-radius: 10px;
    margin: 20px auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 36px;
    align-items: center;
}
.totals-panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 420px;
    flex-shrink: 0;
}
.total-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border-radius: 14px;
    padding: 14px 18px;
}
.total-card.is-lowest {
    background: #e7f4ec;
}
.total-name {
    font-size: 15px;
    font-weight: 700;
    color: #123c2d;
}
.total-note {
    margin-top: 2px;
    font-size: 13px;
    color: #6b8a7c;
}
.total-price {
    font-size: 22px;
    font-weight: 700;
    color: #123c2d;
}
.shopping-list :deep(.build-list-btn) {
    width: 276px;
    height: 80px;
    padding: 0;
    font-size: 20px;
    font-weight: bold;
    color: #123C2D;
    --el-button-text-color: #123C2D;
    --el-button-hover-text-color: #123C2D;
    --el-button-active-text-color: #123C2D;
}
.home-section {
    width: 1296px;
    margin: 48px auto 0;
}
.section-title {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    color: #123c2d;
}
.section-desc {
    margin: 8px 0 0;
    font-size: 16px;
    color: #547066;
}
.feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 24px;
}
.feature-card {
    background: #fff;
    border-radius: 16px;
    padding: 28px 24px;
    box-shadow: 0 8px 24px rgba(17, 57, 43, 0.04);
}
.feature-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #e7f4ec;
    color: #176b4b;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}
.feature-icon svg {
    width: 22px;
    height: 22px;
}
.feature-title {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #123c2d;
}
.feature-desc {
    margin: 8px 0 0;
    font-size: 14px;
    line-height: 1.5;
    color: #547066;
}
.trending-section {
    margin-top: 56px;
}
.section-heading {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
}
.view-all {
    border: none;
    background: transparent;
    color: #176b4b;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    white-space: nowrap;
}
.trending-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-top: 24px;
}
.deal-card {
    background: #fff;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 8px 24px rgba(17, 57, 43, 0.04);
    cursor: pointer;
}
.product-thumb {
    height: 148px;
    border-radius: 12px;
    background: #e7f4ec;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8aa198;
    font-size: 12px;
    letter-spacing: 0.08em;
    overflow: hidden;
}
.product-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.deal-store {
    margin-top: 14px;
    font-size: 13px;
    font-weight: 700;
}
.store-woolworths {
    color: #176b4b;
}
.store-paknsave {
    color: #d4a017;
}
.store-newworld {
    color: #c41e3a;
}
.deal-name {
    margin-top: 4px;
    font-size: 18px;
    font-weight: 700;
    color: #123c2d;
}
.deal-price {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-top: 6px;
    font-size: 24px;
    font-weight: 700;
    color: #123c2d;
}
.from-price {
    font-size: 13px;
    font-weight: 400;
    color: #8aa198;
    text-decoration: line-through;
}
.best-price {
    display: inline-flex;
    margin-top: 10px;
    padding: 4px 10px;
    border-radius: 999px;
    background: #e7f4ec;
    color: #176b4b;
    font-size: 12px;
    font-weight: 600;
}
</style>
