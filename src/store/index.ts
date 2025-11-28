// src/store/index.ts
// Redux store 配置文件

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import productsReducer from '../pages/store/productsSlice';
import cartReducer from '../pages/store/cartSlice';
import categoryReducer from '../pages/store/categorySlice';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    categories: categoryReducer,

  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;