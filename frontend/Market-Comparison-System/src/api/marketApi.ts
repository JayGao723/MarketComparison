import request from '@/utils/request'
import { mockProducts, mockStores } from '@/data/mockMarket'
import type { Product, StoreInfo } from '@/types/market'

/**
 * 接口还没接好时保持 true，页面会使用原型示例数据。
 * 后端准备好后改成 false，并确认下面的 url。
 */
const USE_MOCK = true

export function getTrendingProducts(): Promise<Product[]> {
  if (USE_MOCK) return Promise.resolve(mockProducts.slice(0, 4))
  return request({ url: '/products/trending', method: 'get' })
}

export function searchProducts(keyword: string): Promise<Product[]> {
  if (USE_MOCK) {
    const query = keyword.trim().toLowerCase()
    const matched = mockProducts.filter((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(query),
    )
    if (matched.length) return Promise.resolve(matched)
    if (!query || query === 'milk') return Promise.resolve(mockProducts.slice(0, 4))
    return Promise.resolve([])
  }
  return request({ url: '/products/search', method: 'get', params: { q: keyword } })
}

export function getProduct(id: string): Promise<Product | null> {
  if (USE_MOCK) return Promise.resolve(mockProducts.find((product) => product.id === id) ?? null)
  return request({ url: `/products/${id}`, method: 'get' })
}

export function getDeals(): Promise<Product[]> {
  if (USE_MOCK) return Promise.resolve(mockProducts)
  return request({ url: '/deals', method: 'get' })
}

export function getStores(): Promise<StoreInfo[]> {
  if (USE_MOCK) return Promise.resolve(mockStores)
  return request({ url: '/stores', method: 'get' })
}
