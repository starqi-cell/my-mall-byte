// src/components/Navbar.tsx
import React from 'react';
import { Layout, Input, Badge, Button } from 'antd';
import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../store';
import { setFilter, navigateToList } from '../store/shopSlice';

const { Header } = Layout;
const { Search } = Input;

interface NavbarProps {
  toggleCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleCart }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.shop.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Header style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%', background: '#fff', padding: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div 
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }} 
          onClick={() => dispatch(navigateToList())}
        >
          <ShoppingOutlined style={{ fontSize: 24, marginRight: 8 }} />
          ByteMall
        </div>

        <div style={{ flex: 1, maxWidth: 500, margin: '0 40px', display: 'flex' }} className="hidden-xs">
          <Search
            placeholder="搜全站..."
            allowClear
            enterButton
            onSearch={(val) => dispatch(setFilter({ keyword: val }))}
            onChange={(e) => dispatch(setFilter({ keyword: e.target.value }))}
          />
        </div>
        
        <Badge count={cartCount} showZero>
          <Button 
            type="text" 
            icon={<ShoppingCartOutlined style={{ fontSize: 22 }} />} 
            onClick={toggleCart}
            size="large"
          />
        </Badge>
      </div>
      <style>{`@media (max-width: 576px) { .hidden-xs { display: none !important; } }`}</style>
    </Header>
  );
};

export default Navbar;