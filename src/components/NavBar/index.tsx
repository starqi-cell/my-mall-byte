// src/components/Navbar.tsx
// 导航栏组件

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Input, Badge } from 'antd';

import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';

import { useAppSelector, useAppDispatch } from '../../store';
import { CartItem } from '../../types';
import { setFilter } from '../../pages/store/productsSlice';

import { StyledHeader, HeaderInner, LogoLink, SearchWrapper, CartButton } from './style';

const { Search } = Input;

interface NavbarProps {
  toggleCart: () => void;
}

const Navbar: React.FC<NavbarProps> = memo(({ toggleCart }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.cart);
  const cartCount = cart.reduce((acc, item: CartItem) => acc + item.quantity, 0);

  return (
    <StyledHeader>
      <HeaderInner>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <LogoLink>
            <ShoppingOutlined />
            MyMall
          </LogoLink>
        </Link>

        <SearchWrapper>
          <Search
            placeholder="搜全站..."
            enterButton
            onSearch={(val) => dispatch(setFilter({ keyword: val }))}
            onChange={(e) => dispatch(setFilter({ keyword: e.target.value }))}
          />
        </SearchWrapper>

        <Badge count={cartCount} showZero>
          <CartButton
            type="text"
            icon={<ShoppingCartOutlined />}
            onClick={toggleCart}
            size="large"
          />
        </Badge>
      </HeaderInner>
    </StyledHeader>
  );
});

export default memo(Navbar);