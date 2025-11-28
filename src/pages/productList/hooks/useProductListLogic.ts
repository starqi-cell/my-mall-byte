// src/pages/ProductList/useProductListLogic.ts
// 商品列表页逻辑封装 Hook

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { useParams } from 'react-router-dom';
import { fetchProducts, setSort, setPage, setFilter } from '../../store/productsSlice';

export const useProductListLogic = () => {
  const dispatch = useAppDispatch();
  const { category: routeCategory } = useParams<{ category?: string }>();
  const { products, filters, sort, pagination, loading } = useAppSelector(s => s.products);
  
  useEffect(() => {
    const categoryToUse = routeCategory || 'all';
    dispatch(fetchProducts(categoryToUse));
    dispatch(setFilter({ category: categoryToUse }));
  }, [routeCategory, dispatch]);
  
  useEffect(() => {
    const routeCategoryValue = routeCategory || 'all';
    const filterCategoryValue = filters.category === '全部' ? 'all' : filters.category;
    if (routeCategoryValue !== filterCategoryValue) {
      dispatch(fetchProducts(filterCategoryValue));
    }
  }, [filters.category, routeCategory, dispatch]);


  const filteredProducts = useMemo(() => {
    let res = [...products];


    const category = filters.category === '全部' ? 'all' : filters.category;
    if (category !== 'all') {
      res = res.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }


    if (filters.keyword) res = res.filter(p => p.title.toLowerCase().includes(filters.keyword.toLowerCase()));
    if (filters.minPrice) res = res.filter(p => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) res = res.filter(p => p.price <= Number(filters.maxPrice));


    if (sort.by === 'price') {
      res.sort((a, b) => sort.order === 'asc' ? a.price - b.price : b.price - a.price);
    }else if (sort.by === 'rating') {
      res.sort((a, b) => sort.order === 'asc' ? a.rating - b.rating : b.rating - a.rating);
    } else if (sort.by === 'sales') {
      res.sort((a, b) => sort.order === 'asc' ? a.sales - b.sales : b.sales - a.sales);
    }
    return res;
  }, [products, filters, sort]);


  const currentData = useMemo(() => {
    return filteredProducts.slice(
      (pagination.current - 1) * pagination.pageSize, 
      pagination.current * pagination.pageSize
    );
  }, [filteredProducts, pagination]);


  const handleSortChange = (value: string) => {
    const [by, order] = value.split('-');
    dispatch(setSort({ by: by as any, order: order as any }));
  };


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