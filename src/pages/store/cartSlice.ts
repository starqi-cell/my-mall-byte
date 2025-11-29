// src/pages/store/cartSlice.ts
// Redux 切片文件 - 购物车

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types';

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
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
    },
    clearCart: (state) => {
      state.cart = [];
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
