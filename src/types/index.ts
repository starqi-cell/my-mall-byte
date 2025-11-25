// src/types/index.ts

// 1. DummyJSON 原始单品结构
export interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number; // 真实评分
  stock: number;
  brand: string;
  category: string; // DummyJSON 返回的是字符串，不是对象
  thumbnail: string;
  images: string[];
}

// 2. DummyJSON 响应结构 (包裹在 products 字段中)
export interface DummyJsonResponse {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
}

// 3. 应用内部使用的商品结构
export interface ProductSpec {
  colors: string[];
  sizes: string[];
}

export interface Product {
  id: number;
  title: string;
  price: number;
  sales: number;      // 本地模拟 (API无此字段)
  rating: number;     // 使用 API 真实数据
  category: string;
  image: string;      // 映射 API 的 thumbnail
  description: string;
  specs: ProductSpec; // 本地模拟
}

export interface CartItem extends Product {
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface FilterState {
  keyword: string;
  category: string;
  minPrice: string | number;
  maxPrice: string | number;
}

export interface SortState {
  by: 'default' | 'price' | 'sales';
  order: 'asc' | 'desc';
}

export interface PaginationState {
  current: number;
  pageSize: number;
}

export interface ShopState {
  products: Product[];
  categories: string[];
  cart: CartItem[];
  loading: boolean;
  error: string | null;
  view: 'list' | 'detail';
  currentProduct: Product | null;
  filters: FilterState;
  sort: SortState;
  pagination: PaginationState;
}