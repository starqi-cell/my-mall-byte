// src/pages/ProductDetail.tsx
// 商品详情页组件

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Card, Row, Col, Typography,Breadcrumb 
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchProducts } from '../store/productsSlice';
import { Product } from '../../types';
import Display from './componment/Display';
import Description from './componment/Description';
import Reviews from './componment/Reviews';

const ProductDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useAppSelector((state) => state.products);
  const product = products.find((p: Product) => p.id === Number(id));
  
  useEffect(() => {
    dispatch(fetchProducts('all'));
  }, [dispatch, id]);
  
  if (loading) 
    return <div style={{ textAlign: 'center', padding: '50px' }}>加载中...</div>;
  
  if (!product) 
    return <div style={{ textAlign: 'center', padding: '50px' }}>产品不存在</div>;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Breadcrumb 
        items={[
          { title: <Link to="/"><HomeOutlined /> 首页</Link> }, 
          { title: <Link to={`/category/${product.category}`}>{product.category}</Link> }, 
          { title: '详情' }
        ]} 
        style={{ marginBottom: 16 }} 
      />
      <Card>
        <Row gutter={[48, 24]}>
          <Col xs={24} md={12}>
            <Display Images={product.images} />
          </Col>
          <Col xs={24} md={12}>
            <Description product={product} />
          </Col>
        </Row>
      </Card>
      <div style={{ marginTop: 40 }}>
      <Reviews reviews={product.reviews} />
      </div>
    </div>
    
  );
};

export default ProductDetail;