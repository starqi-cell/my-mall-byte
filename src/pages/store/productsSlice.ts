// src/pages/store/productsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, FilterState, SortState } from '../../types';
import { getProductList,getCategoryList } from '../service/shop';
import { capitalize } from '../../utils/string';

// 获取所有商品列表
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (categorySlug: string = 'all', { rejectWithValue }) => {
    try {
      const response = await getProductList(categorySlug);
      const rawProducts = response.products || [];

      // 数据适配器
      const adaptedProducts: Product[] = rawProducts.map((item: any) => ({
        ...item,
        category: capitalize(item.category),
        image: item.thumbnail,
        brand: item.brand || 'Generic',
        sku: item.sku || `SKU-${item.id}`,
        discount: item.discountPercentage,

        // 前端模拟字段
        sales: Math.floor(Math.random() * 3000) + 50,
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



interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  filters: FilterState;                               // 当前的过滤条件
  sort: SortState;
  pagination: { current: number; pageSize: number };   // 分页信息: 当前页码和每页条数
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  filters: { keyword: '', category: '全部', minPrice: '', maxPrice: '' },
  sort: { by: 'default', order: 'asc' },
  pagination: { current: 1, pageSize: 8 }
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // 设置过滤条件
    setFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.current = 1;
    },
    // 设置排序条件
    setSort: (state, action: PayloadAction<SortState>) => {
      state.sort = action.payload;
    },
    // 设置当前页码
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.current = action.payload;
    },

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
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : action.error.message || 'Fetch failed';
      });

  }
});

export const {
  setFilter,
  setSort,
  setPage
} = productsSlice.actions;

export default productsSlice.reducer;
