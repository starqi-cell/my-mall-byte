// src/components/ProductCard/style.ts
import styled from "styled-components";
import { Typography } from "antd";

export const StyledCover = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  position: relative;
  background: #f5f5f5;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

export const CategoryText = styled(Typography.Text)`
  font-size: 12px;
`;

export const TitleText = styled(Typography.Title)`
  && {
    font-size: 14px;
    height: 44px;
    margin-bottom: 8px;
  }
`;
