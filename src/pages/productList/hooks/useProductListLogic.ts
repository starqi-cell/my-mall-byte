// src/pages/ProductList/useProductListLogic.ts
import { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { fetchProducts, setSort, setPage } from '../../store/productsSlice';

export const useProductListLogic = () => {
  const dispatch = useAppDispatch();
  const { products, filters, sort, pagination, loading } = useAppSelector(s => s.products);
  
  // 1. 副作用：获取数据
  useEffect(() => {
    const category = filters.category;
    dispatch(fetchProducts(category === '全部' ? 'all' : category));
  }, [filters.category, dispatch]);

  // 2. 计算属性：本地筛选和排序
  const filteredProducts = useMemo(() => {
    let res = [...products];
    if (filters.keyword) res = res.filter(p => p.title.toLowerCase().includes(filters.keyword.toLowerCase()));
    if (filters.minPrice) res = res.filter(p => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) res = res.filter(p => p.price <= Number(filters.maxPrice));

    if (sort.by === 'price') {
      res.sort((a, b) => sort.order === 'asc' ? a.price - b.price : b.price - a.price);
    }
    return res;
  }, [products, filters, sort]);

  // 3. 计算属性：当前页数据
  const currentData = useMemo(() => {
    return filteredProducts.slice(
      (pagination.current - 1) * pagination.pageSize, 
      pagination.current * pagination.pageSize
    );
  }, [filteredProducts, pagination]);

  // 4. 事件处理
  const handleSortChange = (value: string) => {
    const [by, order] = value.split('-');
    dispatch(setSort({ by: by as any, order: order as any }));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return {
    loading,
    products, // 原始数据（用于判断是否有数据）
    filteredProducts, // 筛选后的总数据（用于分页总数）
    currentData, // 当前页显示的数据
    pagination,
    handleSortChange,
    handlePageChange
  };
};