// src/pages/productList/components/ProductContent/index.tsx
// 商品内容组件

import React, { FC, useMemo, useEffect } from 'react'; 
import { Row, Col, Empty, Pagination } from 'antd';

import ProductCard from '../../../../components/ProductCard';
import { Wrapper } from './style';
import { Product } from '../../../../types'; 
import { SKELETON_PRODUCT } from './config/config';
import { useAppSelector } from '../../../../store';

interface ProductContentProps {
  loading: boolean;
  hasRawData: boolean; 
  pagination: { current: number; pageSize: number };
  onPageChange: (page: number) => void;
}

const ProductContent: FC<ProductContentProps> = (props) => {
  const { pagination, onPageChange } = props;
  const { current: page } = pagination;
  let products = useAppSelector(state => state.products.products);
  const { filters, sort } = useAppSelector(state => state.products);

  let displayData: Product[] = [];

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

  if(!products.length){
    displayData = Array.from({ length: pagination.pageSize || 8 }).map((_, index) => ({
      ...SKELETON_PRODUCT,
      id: -1 - index, 
      title: '加载中...' 
    }));
  }
  else if(!filteredProducts.length){
    displayData = Array.from({ length: pagination.pageSize || 8 }).map((_, index) => ({
      ...SKELETON_PRODUCT,
      id: -1 - index, 
      title: '没找到相关商品' 
    }));
  } else {
    displayData = filteredProducts.slice((page - 1) * pagination.pageSize, page * pagination.pageSize);
  }

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / (pagination.pageSize || 8)));
    if (page > totalPages) {
      onPageChange(1);
    }
  }, [filteredProducts.length, pagination.pageSize, page]);



  return (
    <Wrapper>
      <Row gutter={[16, 16]}>
        {displayData.map(p => (
          <Col xs={12} md={12} lg={8} xl={6} key={p.id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
      <Pagination 
        current={pagination.current} 
        pageSize={pagination.pageSize}
        total={filteredProducts.length}
        onChange={onPageChange}
        style={{ textAlign: 'center', marginTop: 24 }}
        showSizeChanger={false}
        align='center'
      />
    </Wrapper>
  );
};

export default ProductContent;