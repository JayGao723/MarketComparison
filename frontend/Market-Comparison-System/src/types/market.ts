export interface Offer {
  store: string
  cls: 'ww' | 'pns' | 'nw'
  price: number
  branch: string
  inStock: boolean
}

export interface Product {
  id: string
  icon: string
  name: string
  pack: string
  category: string
  retailer: string
  cls: 'ww' | 'pns' | 'nw'
  price: number
  was: number
  unit: string
  saving: number
  offers: Offer[]
}

export interface StoreInfo {
  id: string
  name: string
  address: string
  logo: string
  cls: 'ww' | 'pns' | 'nw'
  updated: string
}

export interface ShoppingItem {
  id: string
  qty: number
}
