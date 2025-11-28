// src/pages/ProductList/components/ProductSortBar.tsx
// 商品排序栏组件

import React from 'react';
import { Button, Select } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import { Wrapper } from './style';

const { Option } = Select;

interface ProductSortBarProps {
  onOpenMobileFilter: () => void;
  onSortChange: (val: string) => void;
}

const ProductSortBar: React.FC<ProductSortBarProps> = ({ onOpenMobileFilter, onSortChange }) => {
  return (
    <Wrapper>

        <Button 
          icon={<FilterOutlined />} 
          onClick={onOpenMobileFilter} 
          className="lg-only"
        >
          筛选
        </Button>
        <Select 
          defaultValue="default-asc" 
          onChange={onSortChange}
        >
          <Option value="default-asc">综合排序</Option>
          <Option value="price-asc">价格: 低 → 高</Option>
          <Option value="price-desc">价格: 高 → 低</Option>
          <Option value="rating-asc">评分: 低 → 高</Option>
          <Option value="rating-desc">评分: 高 → 低</Option>
          <Option value="sales-desc">销量: 高 → 低</Option>
          <Option value="sales-asc">销量: 低 → 高</Option>
        </Select>

    </Wrapper>
  );
};

export default ProductSortBar;