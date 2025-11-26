// src/pages/ProductList/style.ts
// 样式文件

import styled from 'styled-components';
import { Row } from 'antd';

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 24px;
`;

// 移动端筛选栏
export const MobileFilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  .lg-only {
    @media (min-width: 992px) {
      display: none;
    }
  }
`;

// 商品网格
export const ProductGrid = styled(Row)`
  margin-top: 8px;
`;

// 居中分页
export const CenterPagination = styled.div`
  margin-top: 24px;
  text-align: center;
`;
