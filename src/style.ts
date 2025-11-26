// src/App/style.ts
import styled from 'styled-components';
import { Layout } from 'antd';

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: #f5f5f5;
`;

export const StyledContent = styled(Layout.Content)`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const StyledFooter = styled(Layout.Footer)`
  text-align: center;
`;
