// src/pages/ProductList/useProductListLogic.ts
// 商品列表页逻辑封装 Hook

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { fetchProducts, setSort, setPage } from '../../store/productsSlice';

export const useProductListLogic = () => {
  const dispatch = useAppDispatch();
  const { products, filters, sort, pagination, loading } = useAppSelector(s => s.products);
  
  // 获取数据
  useEffect(() => {
    const category = filters.category;
    dispatch(fetchProducts(category === '全部' ? 'all' : category));
  }, [filters.category, dispatch]);

  // 本地筛选和排序
  const filteredProducts = useMemo(() => {
    let res = [...products];

    // 搜索和价格过滤
    if (filters.keyword) res = res.filter(p => p.title.toLowerCase().includes(filters.keyword.toLowerCase()));
    if (filters.minPrice) res = res.filter(p => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) res = res.filter(p => p.price <= Number(filters.maxPrice));

    if (sort.by === 'price') {
      res.sort((a, b) => sort.order === 'asc' ? a.price - b.price : b.price - a.price);
    }
    return res;
  }, [products, filters, sort]);

  // 当前页范围数据
  const currentData = useMemo(() => {
    return filteredProducts.slice(
      (pagination.current - 1) * pagination.pageSize, 
      pagination.current * pagination.pageSize
    );
  }, [filteredProducts, pagination]);

  // 排序变更处理
  const handleSortChange = (value: string) => {
    const [by, order] = value.split('-');
    dispatch(setSort({ by: by as any, order: order as any }));
  };

  // 换页处理
  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return {
    loading,              // 加载状态
    products,             // 全部商品 
    filteredProducts,     // 筛选后的总数据
    currentData,          // 当前页显示的数据
    pagination,           // 分页信息
    handleSortChange,     // 排序变更处理
    handlePageChange      // 换页处理
  };
};