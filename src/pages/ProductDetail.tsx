// src/pages/ProductDetail.tsx
import React, { useState } from 'react';
import { 
  Card, Row, Col, Typography, Tag, Space, Rate, Divider, 
  Radio, InputNumber, Button, Breadcrumb, message, Image 
} from 'antd';
import { ShoppingCartOutlined, HomeOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../store';
import { addToCart, navigateToList } from '../store/shopSlice';

const { Title, Text, Paragraph } = Typography;

const ProductDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(state => state.shop.currentProduct);
  
  if (!product) return null;
  
  const [q, setQ] = useState(1);
  const [c, setC] = useState(product.specs.colors[0]);
  const [s, setS] = useState(product.specs.sizes[0]);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
      <Breadcrumb 
        items={[
          { title: <span onClick={() => dispatch(navigateToList())} style={{ cursor: 'pointer' }}><HomeOutlined /> 首页</span> }, 
          { title: product.category }, 
          { title: '详情' }
        ]} 
        style={{ marginBottom: 16 }} 
      />
      <Card>
        <Row gutter={[48, 24]}>
          <Col xs={24} md={12}>
            <Image src={product.image} fallback="https://placehold.co/600?text=No+Image" />
          </Col>
          <Col xs={24} md={12}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Tag color="blue">{product.category}</Tag>
              <Title level={2}>{product.title}</Title>
              <Text type="danger" style={{ fontSize: 24, fontWeight: 'bold' }}>${product.price}</Text>
              <Paragraph>{product.description}</Paragraph>
              <Divider />
              
              <div>
                <Text strong>颜色: </Text>
                <Radio.Group value={c} onChange={e => setC(e.target.value)}>
                  {product.specs.colors.map(v => <Radio.Button key={v} value={v}>{v}</Radio.Button>)}
                </Radio.Group>
              </div>
              
              <div>
                <Text strong>尺码: </Text>
                <Radio.Group value={s} onChange={e => setS(e.target.value)}>
                  {product.specs.sizes.map(v => <Radio.Button key={v} value={v}>{v}</Radio.Button>)}
                </Radio.Group>
              </div>
              
              <div>
                <Text strong>数量: </Text>
                <InputNumber min={1} value={q} onChange={v => setQ(v || 1)} />
              </div>
              
              <Button 
                type="primary" size="large" icon={<ShoppingCartOutlined />} 
                onClick={() => { 
                  dispatch(addToCart({ ...product, quantity: q, selectedColor: c, selectedSize: s })); 
                  message.success('已加入购物车'); 
                }}
              >
                加入购物车
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductDetail;