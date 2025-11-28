// src/components/ProductCard/index.tsx
// 商品卡片组件

import React from "react";
import { Card, Typography, Space, Rate, Tag, Button, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { addToCart } from "../../pages/store/cartSlice";
import { Product } from "../../types";

import {
  StyledCover,
  StyledImage,
  PriceRow,
  CategoryText,
  TitleText
} from "./style";

const { Text } = Typography;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        selectedColor: product.specs.colors[0],
        selectedSize: product.specs.sizes[0]
      })
    );
    message.success("已加入购物车");
  };

  return (
    <Card
      hoverable
      style={{ height: "100%", display: "flex", flexDirection: "column", padding: 16, flex: 1 }}
      cover={
        <Link to={`/product/${product.id}`}>
          <StyledCover>
            <StyledImage
              alt={product.title}
              src={product.image}
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "https://placehold.co/400?text=No+Image")
              }
            />
            {product.sales > 2000 && (
              <Tag color="red" style={{ position: "absolute", top: 10, left: 10 }}>
                Hot
              </Tag>
            )}
          </StyledCover>
        </Link>
      }
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <CategoryText type="secondary">{product.tags.join(' ')}</CategoryText>
        
        <TitleText level={5} ellipsis={{ rows: 2 }}>
          {product.title}
        </TitleText>

        <Space>
          <Rate disabled defaultValue={product.rating} style={{ fontSize: 12 }} />
          <Text type="secondary" style={{ fontSize: 12 }}>
            ({product.sales})
          </Text>
        </Space>

        <PriceRow>
          <Text type="danger" strong style={{ fontSize: 18 }}>
            ${product.price}
          </Text>
          <Button type="primary" shape="circle" icon={<ShoppingCartOutlined />} onClick={handleAddToCart} />
        </PriceRow>
      </div>
    </Card>
  );
};

export default ProductCard;
