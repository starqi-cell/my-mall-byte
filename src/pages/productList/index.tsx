// src/pages/productList/index.tsx
// 商品列表页组件


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Drawer } from 'antd';

import { useAppDispatch, useAppSelector } from '../../store';
import { fetchProducts, setSort, setPage, setFilter } from '../store/productsSlice';

import FilterSidebar from '../../components/FilterSidebar';
import ProductSortBar from './components/ProductSortBar';
import ProductContent from './components/ProductContent';
import { Wrapper } from './style';

const ProductList: React.FC = () => {

  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);


  const dispatch = useAppDispatch();
  const { category: routeCategory } = useParams<{ category?: string }>();
  

  const { 
    products, 
    filters, 
    pagination, 
    loading 
  } = useAppSelector(s => s.products);


  useEffect(() => {
    const categoryToUse = routeCategory || 'all';
    dispatch(setFilter({ category: categoryToUse }));

    dispatch(fetchProducts(categoryToUse));
  }, [routeCategory, dispatch]);


  useEffect(() => {
    const filterCategoryValue = filters.category === '全部' ? 'all' : filters.category;
    dispatch(fetchProducts(filterCategoryValue));
  }, [filters.category, dispatch]);



  const handleSortChange = (value: string) => {
    const [by, order] = value.split('-');
    dispatch(setSort({ by: by as any, order: order as any }));
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };


  return (
    <Wrapper>
      {/* 布局: xs = 手机, lg = 平板, xl = 电脑 */}
      <Row gutter={24}>

        <Col xs={0} md={0} lg={4} xl={4}>
          <FilterSidebar />
        </Col>
        
        <Col xs={0} md={0} lg={2} xl={2} />


        <Col xs={24} md={24} lg={18} xl={18}>
          
          <ProductSortBar 
            onOpenMobileFilter={() => setMobileFilterOpen(true)}
            onSortChange={handleSortChange}
          />

          <ProductContent 
            loading={loading}

            hasRawData={products && products.length > 0} 
            pagination={pagination}
            onPageChange={handlePageChange}
          />

        </Col>
      </Row>

      {/* 移动端筛选抽屉 */}
      <Drawer 
        title="筛选" 
        placement="left" 
        onClose={() => setMobileFilterOpen(false)} 
        open={isMobileFilterOpen}
      >
        <FilterSidebar />
      </Drawer>
    </Wrapper>
  );
};

export default ProductList;