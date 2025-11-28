// src/components/CartDrawer/index.tsx
// 购物车抽屉组件

import React from 'react';
import { Drawer, Button, List, Typography, Empty, Avatar } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store';
import { removeFromCart } from '../../pages/store/cartSlice';
import { CartItem } from '../../types';
import { tofixedTwo } from '../../utils/string';
import { Link } from 'react-router-dom';

import { FooterWrapper, TotalRow, PriceText } from "./style"; 

const { Text } = Typography;

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.cart);

  const handleRemove = (item: CartItem) => {
    dispatch(removeFromCart({
      id: item.id,
      color: item.selectedColor,
      size: item.selectedSize
    }));
  };

  const total = tofixedTwo(cart.reduce((t, i) => t + i.price * i.quantity, 0));

  return (
    <Drawer
      title={`购物车 (${cart.length})`}
      placement="right"
      onClose={onClose}
      open={isOpen}
      footer={
        cart.length > 0 && (
          <FooterWrapper>
            <TotalRow>
              <span>合计:</span>
              <PriceText>${total}</PriceText>
            </TotalRow>

            <Button type="primary" block size="large">
              去结算
            </Button>
          </FooterWrapper>
        )
      }
    >
      {cart.length === 0 ? (
        <Empty description="购物车空空如也" />
      ) : (
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
                  onClick={() => handleRemove(item)}
                />
              ]}
            >
              <List.Item.Meta
                avatar={
                <Link to={`/product/${item.id}`}>
                  <Avatar shape="square" size={60} src={item.image} />
                </Link>
                }
                title={item.title}
                description={
                  <div>
                    <Text type="secondary">{item.selectedColor} / {item.selectedSize}</Text>
                    <div>
                      <Text type="danger">${item.price}</Text> x {item.quantity}
                    </div>
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
