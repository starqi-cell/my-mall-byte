// src/components/FilterSidebar/index.tsx
// 筛选侧边栏组件

import { FC, memo, ReactNode } from 'react';
import { Card, Typography, Radio, InputNumber, Spin } from 'antd';

import { useAppDispatch, useAppSelector } from '../../store';
import { setFilter } from '../../pages/store/productsSlice';
import { Wrapper } from './style'; 

interface IProps {
  children?: ReactNode
}

const { Title, Text } = Typography;

const FilterSidebar: FC<IProps> = memo(() => {

  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(state => state.products);
  const { list: categories } = useAppSelector(state => state.categories); 
  let newcategories=categories;
  if(newcategories.length===0){
    newcategories=[{name:'加载中...',slug:'all',url:''}];
  }
  return (
    <Wrapper>
      <Card>
        <div className="filter-section">
          <Title level={5}>商品分类</Title>
          
          <div className="category-scroll-area">
                <Radio.Group
                  onChange={(e) => dispatch(setFilter({ category: e.target.value }))}
                  value={filters.category === '全部' ? 'all' : filters.category}
                  style={{ width: '100%' }}
                  size="large"
                  vertical
                  options={newcategories.map((cat) => ({
                    label: cat.name,
                    value: cat.slug,
                  })) .concat([])}
                />
          </div>
        </div>

        <div className="filter-section">
          <Title level={5}>价格范围</Title>
          <div className="price-row">
            <InputNumber
              placeholder="Min"
              value={filters.minPrice ? Number(filters.minPrice) : undefined}
              onChange={(val) => dispatch(setFilter({ minPrice: val ? val.toString() : '' }))}
              style={{ width: 80 }}
              min={0}
              suffix="$"
              controls={false}
            />
            <Text> - </Text>
            <InputNumber
              placeholder="Max"
              value={filters.maxPrice ? Number(filters.maxPrice) : undefined}
              onChange={(val) => dispatch(setFilter({ maxPrice: val ? val.toString() : '' }))}
              style={{ width: 80 }}
              min={0}
              suffix="$"
              controls={false}
            />
          </div>
        </div>

      </Card>  
    </Wrapper>
  );
});

export default memo(FilterSidebar);