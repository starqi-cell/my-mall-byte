// src/store/shopSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../api/client';
import { Product, DummyJsonResponse, ShopState, FilterState, SortState, CartItem } from '../types';

// 辅助函数：首字母大写 (美化分类显示)
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// 异步 Action：获取商品列表
export const fetchProducts = createAsyncThunk(
  'shop/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // DummyJSON 默认分页，limit=100 获取较多数据用于前端筛选演示
      const response = await apiClient.get<DummyJsonResponse>('/products?limit=100');
      
      const rawProducts = response.data.products;

      // 数据适配器 (Adapter Pattern)
      const adaptedProducts: Product[] = rawProducts.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        // 处理分类：API返回全小写，转为首字母大写
        category: capitalize(item.category), 
        // 图片：优先使用 thumbnail 缩略图
        image: item.thumbnail, 
        // 评分：使用 API 真实数据
        rating: item.rating, 
        // 销量：API无此数据，随机模拟 (50~3000)
        sales: Math.floor(Math.random() * 2950) + 50, 
        // 规格：API无此数据，固定模拟
        specs: { 
          colors: ['Black', 'White', 'Blue'], 
          sizes: ['S', 'M', 'L', 'XL'] 
        }
      }));
      
      return adaptedProducts;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

const initialState: ShopState = {
  products: [],
  categories: [],
  cart: [],
  loading: false,
  error: null,
  view: 'list',
  currentProduct: null,
  filters: { keyword: '', category: '全部', minPrice: '', maxPrice: '' },
  sort: { by: 'default', order: 'asc' },
  pagination: { current: 1, pageSize: 8 }
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.current = 1; // 筛选条件变化时重置页码
    },
    setSort: (state, action: PayloadAction<SortState>) => {
      state.sort = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.current = action.payload;
    },
    navigateToDetail: (state, action: PayloadAction<Product>) => {
      state.view = 'detail';
      state.currentProduct = action.payload;
    },
    navigateToList: (state) => {
      state.view = 'list';
      state.currentProduct = null;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cart.find(item => 
        item.id === action.payload.id && 
        item.selectedColor === action.payload.selectedColor &&
        item.selectedSize === action.payload.selectedSize
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number; color: string; size: string }>) => {
      state.cart = state.cart.filter(item => 
        !(item.id === action.payload.id && 
          item.selectedColor === action.payload.color &&
          item.selectedSize === action.payload.size)
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        // 提取并去重分类，然后排序
        const uniqueCategories = Array.from(new Set(action.payload.map(p => p.category))).sort();
        state.categories = ['全部', ...uniqueCategories];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { 
  setFilter, setSort, setPage, navigateToDetail, 
  navigateToList, addToCart, removeFromCart 
} = shopSlice.actions;

export default shopSlice.reducer;