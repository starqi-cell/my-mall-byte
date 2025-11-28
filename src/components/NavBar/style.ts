// src/components/Navbar/style.ts
// 导航栏组件样式

import styled from 'styled-components';
import { Layout, Input, Button } from 'antd';

export const StyledHeader = styled(Layout.Header)`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: #fff;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const LogoLink = styled.span`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #1890ff;

  svg {
    font-size: 24px;
    margin-right: 8px;
  }
`;

export const SearchWrapper = styled.div`
  flex: 1;
  max-width: 500px;
  margin: 0 40px;
  display: flex;

  @media (max-width: 576px) {
    display: none;
  }
`;

export const CartButton = styled(Button)`
  .anticon {
    font-size: 22px;
  }
`;
