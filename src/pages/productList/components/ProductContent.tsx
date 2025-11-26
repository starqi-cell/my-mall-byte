// src/pages/ProductList/components/ProductContent.tsx
// 商品列表内容组件

import React from 'react';
import { Col, Empty, Spin, Pagination } from 'antd';
import ProductCard from '../../../components/ProdectCard';
import { ProductGrid, CenterPagination } from '../style';
import { Product } from '../../../types'; 

interface ProductContentProps {
  loading: boolean;
  hasRawData: boolean; 
  currentData: Product[];
  totalFiltered: number;
  pagination: { current: number; pageSize: number };
  onPageChange: (page: number) => void;
}

const ProductContent: React.FC<ProductContentProps> = ({
  loading,
  hasRawData,
  currentData,
  totalFiltered,
  pagination,
  onPageChange
}) => {
  if (loading) {
    return <div style={{ padding: 100, textAlign: 'center' }}><Spin size="large" /></div>;
  }

  if (!hasRawData) {
    return <Empty description="暂无商品" />;
  }

  if (currentData.length === 0) {
    return <Empty description="筛选后暂无商品" />;
  }

  return (
    <>
      <ProductGrid gutter={[16, 16]}>
        {currentData.map(p => (
          <Col xs={12} sm={12} md={8} xl={6} key={p.id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </ProductGrid>
      <CenterPagination>
        <Pagination 
          current={pagination.current} 
          pageSize={pagination.pageSize}
          total={totalFiltered}
          onChange={onPageChange}
        />
      </CenterPagination>
    </>
  );
};

export default ProductContent;