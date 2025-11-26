// src/components/FilterSidebar/index.tsx
import React, { FC, memo, ReactNode } from 'react';
import { Card, Typography, Radio, InputNumber, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store';
import { setFilter } from '../../pages/store/productsSlice';
import { SidebarContainer, Section, PriceContainer } from './style';

interface IProps {
  children?: ReactNode
}

const { Title, Text } = Typography;

const FilterSidebar: FC<IProps> = memo(() => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(state => state.products);
  const { list: categories } = useAppSelector(state => state.categories);

  function handleCategoryChange(e: any) {
    dispatch(setFilter({ category: e.target.value }));
  }

  return (
    <Card style={{ height: '100%', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
      <SidebarContainer>

        {/* 分类筛选 */}
        <Section>
          <Title level={5}>商品分类</Title>
          
          <div style={{ minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {categories.length === 0 ? (
              <Spin />
            ) : (
              <Radio.Group
                onChange={(e) => dispatch(setFilter({ category: e.target.value }))}
                value={filters.category === '全部' ? 'all' : filters.category}
                style={{ width: '100%' }}
              >
                {categories.map((cat) => (
                  <Radio key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </Radio>
                ))}
              </Radio.Group>
            )}
          </div>
        </Section>

        {/* 价格筛选 */}
        <Section>
          <Title level={5}>价格范围 ($)</Title>
          <PriceContainer>
            <InputNumber
              placeholder="Min"
              value={filters.minPrice ? Number(filters.minPrice) : undefined}
              onChange={(val) => dispatch(setFilter({ minPrice: val ? val.toString() : '' }))}
              style={{ width: 80 }}
              min={0}
            />
            <Text> - </Text>
            <InputNumber
              placeholder="Max"
              value={filters.maxPrice ? Number(filters.maxPrice) : undefined}
              onChange={(val) => dispatch(setFilter({ maxPrice: val ? val.toString() : '' }))}
              style={{ width: 80 }}
              min={0}
            />
          </PriceContainer>
        </Section>
        
      </SidebarContainer>
    </Card>
  );
});

export default memo(FilterSidebar);
