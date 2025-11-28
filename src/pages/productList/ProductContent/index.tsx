// src/pages/ProductList/components/ProductContent.tsx
// 商品列表内容组件

import React from 'react';
import { Row,Col, Empty, Spin, Pagination } from 'antd';


import ProductCard from '../../../components/ProductCard';
import { Wrapper } from './style';
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
    return (
    <div style={{ padding: 100, textAlign: 'center' }}>
      <Spin size="large" />
    </div>
  );
  }

  if (!hasRawData) {
    return <Empty description="暂无商品" />;
  }


  return (
    <Wrapper>
      <Row gutter={[16, 16]}>
        {currentData.map(p => (
          <Col xs={12} md={12} lg={8} xl={6} key={p.id}>
            <ProductCard product={p} />
          </Col>
        ))}
      </Row>
      <Pagination 
        current={pagination.current} 
        pageSize={pagination.pageSize}
        total={totalFiltered}
        onChange={onPageChange}
        showSizeChanger={false}
        align='center'
      />
    </Wrapper>
  );
};

export default ProductContent;