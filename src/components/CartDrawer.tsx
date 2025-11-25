// src/components/CartDrawer.tsx
import React from 'react';
import { Drawer, Button, List, Typography, Empty, Avatar } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../store';
import { removeFromCart } from '../store/shopSlice';

const { Text } = Typography;

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.shop.cart);
  const total = cart.reduce((t, i) => t + i.price * i.quantity, 0);

  return (
    <Drawer
      title={`购物车 (${cart.length})`}
      placement="right"
      onClose={onClose}
      open={isOpen}
      width={360}
      footer={
        cart.length > 0 && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontWeight: 'bold' }}>
              <span>合计:</span>
              <span style={{ color: '#ff4d4f' }}>${total}</span>
            </div>
            <Button type="primary" block size="large">去结算</Button>
          </div>
        )
      }
    >
      {cart.length === 0 ? <Empty description="购物车空空如也" /> : (
        <List
          itemLayout="horizontal"
          dataSource={cart}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button 
                  type="text" 
                  danger 
                  icon={<DeleteOutlined />} 
                  onClick={() => dispatch(removeFromCart({ 
                    id: item.id, 
                    color: item.selectedColor, 
                    size: item.selectedSize 
                  }))} 
                />
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar shape="square" size={60} src={item.image} />}
                title={item.title}
                description={
                  <div>
                    <Text type="secondary">{item.selectedColor} / {item.selectedSize}</Text>
                    <div><Text type="danger">${item.price}</Text> x {item.quantity}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
};

export default CartDrawer;