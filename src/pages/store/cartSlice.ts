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
    // 添加商品到购物车
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
    updateCartItemQuantity: (state, action: PayloadAction<{ id: number; color: string; size: string; quantity: number }>) => {
      const { id, color, size, quantity } = action.payload;
      const item = state.cart.find(item => 
        item.id === id && item.selectedColor === color && item.selectedSize === size
      );
      if (item) {
        item.quantity = Math.max(1, quantity); // 确保数量至少为1
      }
    },
    clearCart: (state) => {
      state.cart = [];
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
