// src/components/FilterSidebar.tsx
import React from 'react';
import { Card, Space, Typography, Radio, InputNumber, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../store';
import { setFilter } from '../store/shopSlice';

const { Title, Text } = Typography;

const FilterSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, filters } = useAppSelector(state => state.shop);

  return (
    <Card bordered={false} style={{ height: '100%' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={5}>商品分类</Title>
          {categories.length === 0 ? <Spin /> : (
            <Radio.Group 
              onChange={(e) => dispatch(setFilter({ category: e.target.value }))} 
              value={filters.category}
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              {categories.map((cat) => (
                <Radio key={cat} value={cat}>{cat}</Radio>
              ))}
            </Radio.Group>
          )}
        </div>

        <div>
          <Title level={5}>价格范围 ($)</Title>
          <Space>
            <InputNumber
              placeholder="Min"
              value={filters.minPrice as number}
              onChange={(val) => dispatch(setFilter({ minPrice: val ?? '' }))}
              style={{ width: 80 }}
              min={0}
            />
            <Text>-</Text>
            <InputNumber
              placeholder="Max"
              value={filters.maxPrice as number}
              onChange={(val) => dispatch(setFilter({ maxPrice: val ?? '' }))}
              style={{ width: 80 }}
              min={0}
            />
          </Space>
        </div>
      </Space>
    </Card>
  );
};

export default FilterSidebar;