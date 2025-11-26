// src/components/ProductCard.tsx
import React from 'react';
import { Card, Typography, Space, Rate, Tag, Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { addToCart } from '../../pages/store/cartSlice';
import { Product } from '../../types';

const { Title, Text } = Typography;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart({ 
      ...product, 
      quantity: 1, 
      selectedColor: product.specs.colors[0], 
      selectedSize: product.specs.sizes[0] 
    }));
    message.success('已加入购物车');
  };

  return (
    <Card
      hoverable
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      bodyStyle={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}
      cover={
        <Link to={`/product/${product.id}`}>
          <div style={{ width: '100%', height: 180, overflow: 'hidden', position: 'relative', background: '#f5f5f5' }}>
             <img 
                alt={product.title} 
                src={product.image} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/400?text=No+Image'} 
             />
             {product.sales > 2000 && <Tag color="red" style={{ position: 'absolute', top: 10, left: 10 }}>Hot</Tag>}
          </div>
        </Link>
      }
    >
      <div style={{ flex: 1 }}>
        <Text type="secondary" style={{ fontSize: 12 }}>{product.category}</Text>
        <Title level={5} ellipsis={{ rows: 2 }} style={{ marginBottom: 8, height: 44, fontSize: 14 }}>
          {product.title}
        </Title>
        <Space>
          <Rate disabled defaultValue={product.rating} style={{ fontSize: 12 }} />
          <Text type="secondary" style={{ fontSize: 12 }}>({product.sales})</Text>
        </Space>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <Text type="danger" strong style={{ fontSize: 18 }}>${product.price}</Text>
        <Button 
          type="primary" 
          shape="circle" 
          icon={<ShoppingCartOutlined />} 
          onClick={handleAddToCart}
        />
      </div>
    </Card>
  );
};

export default ProductCard;