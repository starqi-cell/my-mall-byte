// src/pages/ProductList.tsx
import React, { useMemo, useState } from 'react';
import { 
  Layout, Row, Col, Pagination, Empty, Spin, Button, Drawer, Select 
} from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../store';
import { setSort, setPage } from '../store/shopSlice';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';

const { Option } = Select;

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, filters, sort, pagination, loading } = useAppSelector(state => state.shop);
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Memoized Filtering Logic
  const filtered = useMemo(() => {
    let res = [...products];
    if (filters.category !== '全部') res = res.filter(p => p.category === filters.category);
    if (filters.keyword) res = res.filter(p => p.title.toLowerCase().includes(filters.keyword.toLowerCase()));
    if (filters.minPrice) res = res.filter(p => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) res = res.filter(p => p.price <= Number(filters.maxPrice));
    
    if (sort.by === 'price') {
      res.sort((a, b) => sort.order === 'asc' ? a.price - b.price : b.price - a.price);
    } else if (sort.by === 'sales') {
      res.sort((a, b) => b.sales - a.sales);
    }
    return res;
  }, [products, filters, sort]);

  const currentData = filtered.slice(
    (pagination.current - 1) * pagination.pageSize, 
    pagination.current * pagination.pageSize
  );

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Row gutter={24}>
        <Col xs={0} lg={6} xl={5}>
          <FilterSidebar />
        </Col>

        <Col xs={24} lg={18} xl={19}>
          {/* Mobile Filter & Sort Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }} className="lg-hidden-custom">
            <Button icon={<FilterOutlined />} onClick={() => setMobileFilterOpen(true)} className="lg-show">
              筛选
            </Button>
            <Select 
              defaultValue="default-asc" 
              style={{ width: 140 }} 
              onChange={(val) => {
                const [by, order] = val.split('-');
                dispatch(setSort({ by: by as any, order: order as any }));
              }}
            >
              <Option value="default-asc">综合排序</Option>
              <Option value="price-asc">价格: 低到高</Option>
              <Option value="price-desc">价格: 高到低</Option>
            </Select>
          </div>
          <style>{`@media (min-width: 992px) { .lg-show { display: none !important; } } @media (max-width: 991px) { .lg-show { display: inline-block !important; } }`}</style>
          
          {/* Product Grid */}
          {loading ? (
            <div style={{ padding: 100, textAlign: 'center' }}><Spin size="large" tip="Loading..." /></div>
          ) : currentData.length > 0 ? (
            <>
              <Row gutter={[16, 16]}>
                {currentData.map(p => (
                  <Col xs={12} sm={12} md={8} xl={6} key={p.id}>
                    <ProductCard product={p} />
                  </Col>
                ))}
              </Row>
              <div style={{ marginTop: 24, textAlign: 'center' }}>
                <Pagination 
                  current={pagination.current} 
                  pageSize={pagination.pageSize} 
                  total={filtered.length} 
                  onChange={(p) => dispatch(setPage(p))} 
                  showSizeChanger={false} 
                />
              </div>
            </>
          ) : (
            <Empty description="暂无商品" />
          )}
        </Col>
      </Row>

      <Drawer
        title="筛选"
        placement="left"
        onClose={() => setMobileFilterOpen(false)}
        open={isMobileFilterOpen}
        width="80%"
      >
        <FilterSidebar />
      </Drawer>
    </div>
  );
};

export default ProductList;