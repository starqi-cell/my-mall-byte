// src/pages/productDetail/componment/Description.tsx
// 商品详情页 - 商品描述组件

import {memo,useState} from 'react';
import type { FC,ReactNode } from 'react';
import { Space } from 'antd';
import { Product } from '../../../types';
import { TagsContainer } from '../style';
import { Typography, Tag, Divider, Radio, InputNumber, Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../../store';
import { addToCart } from '../../store/cartSlice';


const { Title, Text, Paragraph } = Typography;

interface IProps {
    product: Product;
    children?: ReactNode;
}

const Description: FC<IProps> = memo((props) => {
    const { product } = props;
    const [qunlity, setQunlity] = useState(1);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const dispatch = useAppDispatch();
    return (
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
              <TagsContainer>
                {product.tags.map(tag => (
                  <Tag key={tag} color="blue">{tag}</Tag>
                ))}
              </TagsContainer>
              <Title level={2}>{product.title}</Title>
              <Text type="danger" style={{ fontSize: 24, fontWeight: 'bold' }}>${product.price}</Text>
              <Paragraph>{product.description}</Paragraph>
              <Divider />
              
              <div>
                <Text strong>颜色: </Text>
                <Radio.Group value={color} onChange={e => setColor(e.target.value)}>
                  {product.specs.colors.map((v: string) => <Radio.Button key={v} value={v}>{v}</Radio.Button>)}
                </Radio.Group>
              </div>
              
              <div>
                <Text strong>尺码: </Text>
                <Radio.Group value={size} onChange={e => setSize(e.target.value)}>
                  {product.specs.sizes.map((v: string) => <Radio.Button key={v} value={v}>{v}</Radio.Button>)}
                </Radio.Group>
              </div>
              
              <div>
                <Text strong>数量: </Text>
                <InputNumber min={1} value={qunlity} onChange={v => setQunlity(v || 1)} />
              </div>
              
              <Button 
                type="primary" size="large" icon={<ShoppingCartOutlined />} 
                onClick={() => { 
                  dispatch(addToCart({ ...product, quantity: qunlity, selectedColor: color, selectedSize: size })); 
                  message.success('已加入购物车'); 
                }}
              >
                加入购物车
              </Button>
            </Space>
    );
});

export default memo(Description);