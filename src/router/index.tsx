// src/router/index.tsx
// 路由配置文件

import { createHashRouter } from 'react-router-dom';
import App from '../App';
import ProductList from '../pages/productList';
import ProductDetail from '../pages/productDetail/ProductDetail';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <ProductList />
      },
      {
        path: 'product/:id',
        element: <ProductDetail />
      }
    ]
  }
]);