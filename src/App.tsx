// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useAppDispatch, useAppSelector } from './store';
import { fetchProducts } from './store/shopSlice';

import Navbar from './components/NavBar';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CartDrawer from './components/CartDrawer';

const { Content, Footer } = Layout;
    
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const view = useAppSelector((state: any) => state.shop.view);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Navbar toggleCart={() => setCartOpen(true)} />
      
      <Content>
        {view === 'list' ? <ProductList /> : <ProductDetail />}
      </Content>
      
      <Footer style={{ textAlign: 'center' }}>
        ByteMall Demo (Redux + Axios) ©2024
      </Footer>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </Layout>
  );
};

export default App;