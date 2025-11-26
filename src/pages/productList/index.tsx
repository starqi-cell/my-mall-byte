// src/pages/ProductList/index.tsx
// 商品列表页主组件

import React, { useState } from 'react';
import { Row, Col, Drawer } from 'antd';

import FilterSidebar from '../../components/FilterSidebar';

import { useProductListLogic } from './hooks/useProductListLogic';
import ProductSortBar from './components/ProductSortBar';
import ProductContent from './components/ProductContent';

import { Wrapper } from './style';


const ProductList: React.FC = () => {

  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  const { 
    loading, 
    products, 
    filteredProducts, 
    currentData, 
    pagination, 
    handleSortChange, 
    handlePageChange 
  } = useProductListLogic();
  
  
  return (
    <Wrapper>
      {/*xs = 手机, lg = 平板, xl = 电脑*/}
      <Row gutter={24}>
        {/* 左侧筛选栏 */}
        <Col xs={0} lg={6} xl={5}>
          <FilterSidebar />
        </Col>

        {/* 右侧主内容 */}
        <Col xs={24} lg={18} xl={19}>
          
          <ProductSortBar 
            onOpenMobileFilter={() => setMobileFilterOpen(true)}
            onSortChange={handleSortChange}
          />

          <ProductContent 
            loading={loading}
            hasRawData={products.length > 0}
            currentData={currentData}
            totalFiltered={filteredProducts.length}
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