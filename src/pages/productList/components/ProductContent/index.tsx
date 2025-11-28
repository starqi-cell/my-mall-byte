// src/pages/productList/components/ProductContent/index.tsx
// 商品内容组件

import React, { FC } from 'react'; 
import { Row, Col, Empty, Pagination } from 'antd';

import ProductCard from '../../../../components/ProductCard';
import { Wrapper } from './style';
import { Product } from '../../../../types'; 
import { SKELETON_PRODUCT } from './config/config';

interface ProductContentProps {
  loading: boolean;
  hasRawData: boolean; 
  currentData: Product[];
  totalFiltered: number;
  pagination: { current: number; pageSize: number };
  onPageChange: (page: number) => void;
}

const ProductContent: FC<ProductContentProps> = (props) => {
  const { loading, hasRawData, currentData, totalFiltered, pagination, onPageChange } = props;

  let displayData: Product[] = [];

  if (loading) {
    displayData = Array.from({ length: pagination.pageSize || 8 }).map((_, index) => ({
      ...SKELETON_PRODUCT,
      id: -1 - index, 
      title: 'Loading...' 
    }));
  } else {
    displayData = currentData;
  }


  if (!loading && !hasRawData) {
      displayData = Array.from({ length: pagination.pageSize || 8 }).map((_, index) => ({
      ...SKELETON_PRODUCT,
      id: -1 - index, 
      title: 'Loading...' 
    }));
  }

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
        total={totalFiltered}
        onChange={onPageChange}
        style={{ textAlign: 'center', marginTop: 24 }}
        showSizeChanger={false}
      />
    </Wrapper>
  );
};

export default ProductContent;