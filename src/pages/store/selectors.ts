// src/pages/store/selectors.ts
// Redux 选择器文件

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
  

// 基础选择器
export const selectProductsState = (state: RootState) => state.products;
export const selectCartState = (state: RootState) => state.cart;
export const selectCategoriesState = (state: RootState) => state.categories;
// 产品相关选择器
export const selectAllProducts = createSelector(
  [selectProductsState],
  (productsState) => productsState.products
);

export const selectFilters = createSelector(
  [selectProductsState],
  (productsState) => productsState.filters
);

export const selectSort = createSelector(
  [selectProductsState],
  (productsState) => productsState.sort
);

export const selectPagination = createSelector(
  [selectProductsState],
  (productsState) => productsState.pagination
);

export const selectCategories = createSelector(
  [selectCategoriesState],
  (categoriesState) => categoriesState.list
);

export const selectLoading = createSelector(
  [selectProductsState],
  (productsState) => productsState.loading
);

export const selectError = createSelector(
  [selectProductsState],
  (productsState) => productsState.error
);



// 过滤和排序产品的选择器
export const selectFilteredAndSortedProducts = createSelector(
  [selectAllProducts, selectFilters, selectSort],
  (products, filters, sort) => {
    // 应用过滤
    let filteredProducts = [...products];

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product =>
          product.title.toLowerCase().includes(keyword) ||
          product.description.toLowerCase().includes(keyword) ||
          product.category.toLowerCase().includes(keyword) ||
          (product.brand || '').toLowerCase().includes(keyword)
      );
    }

    if (filters.category && filters.category !== '全部') {
      filteredProducts = filteredProducts.filter(
        product => product.category === filters.category
      );
    }

    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice);
      if (!isNaN(minPrice)) {
        filteredProducts = filteredProducts.filter(
          product => product.price >= minPrice
        );
      }
    }

    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      if (!isNaN(maxPrice)) {
        filteredProducts = filteredProducts.filter(
          product => product.price <= maxPrice
        );
      }
    }

    // 应用排序
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (sort.by) {
        case 'price':
          return sort.order === 'asc' ? a.price - b.price : b.price - a.price;
        case 'rating':
          return sort.order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        case 'sales':
          return sort.order === 'asc' ? a.sales - b.sales : b.sales - a.sales;
        case 'discountPercentage':
          const discountPercentageA = a.discountPercentage  || 0;
          const discountPercentageB = b.discountPercentage  || 0;
          return sort.order === 'asc' ? discountPercentageA - discountPercentageB : discountPercentageB - discountPercentageA;
        default:
          return 0;
      }
    });

    return sortedProducts;
  }
);

// 分页产品选择器
export const selectPaginatedProducts = createSelector(
  [selectFilteredAndSortedProducts, selectPagination],
  (filteredAndSortedProducts, pagination) => {
    const { current, pageSize } = pagination;
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }
);

// 总页数计算
export const selectTotalPages = createSelector(
  [selectFilteredAndSortedProducts, selectPagination],
  (filteredAndSortedProducts, pagination) => {
    return Math.ceil(filteredAndSortedProducts.length / pagination.pageSize);
  }
);

// 购物车相关选择器
export const selectCartItems = createSelector(
  [selectCartState],
  (cartState) => cartState.cart
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((count, item) => count + item.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => {
    return cartItems.reduce((total, item) => {
      const itemdiscountPercentage = item.discountPercentage || item.discountPercentage || 0;
      const discountPercentageedPrice = itemdiscountPercentage > 0
        ? item.price * (1 - itemdiscountPercentage / 100)
        : item.price;
      return total + discountPercentageedPrice * item.quantity;
    }, 0);
  }
);

export const selectCartHasItems = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.length > 0
);

// 获取特定产品的购物车数量
export const selectCartItemQuantityById = (productId: number, color: string, size: string) =>
  createSelector([selectCartItems], (cartItems) => {
    const item = cartItems.find(
      (item) =>
        item.id === productId &&
        item.selectedColor === color &&
        item.selectedSize === size
    );
    return item ? item.quantity : 0;
  });
