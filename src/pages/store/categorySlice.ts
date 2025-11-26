// src/pages/store/categorySlice.ts
// Redux 切片文件 - 商品分类

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../../types';
import { getCategoryList } from '../service/shop';

export const fetchCategory = createAsyncThunk(
  'categories/fetchList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategoryList();

      const allOption: Category = { slug: 'all', name: '全部', url: '' };
      return [allOption, ...response];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface CategoryState {
  list: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  list: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => { state.loading = true; })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default categorySlice.reducer;