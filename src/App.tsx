// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';
import CartDrawer from './components/CartDrawer';
import { StyledLayout, StyledContent, StyledFooter } from './style';
import { useAppDispatch } from './store';
import { fetchProducts } from './pages/store/productsSlice';
import { fetchCategory } from './pages/store/categorySlice';

const App: React.FC = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const dispatch = useAppDispatch();
  
  // 应用启动时加载商品数据
  useEffect(() => {
    dispatch(fetchProducts('all'));
    dispatch(fetchCategory());
  }, [dispatch]);
  return (
    <StyledLayout>
      <Navbar toggleCart={() => setCartOpen(true)}/>
      
      <StyledContent>
        <Outlet />
      </StyledContent>
      
      <StyledFooter>
        my-mall ©2025
      </StyledFooter>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </StyledLayout>
  );
};

export default App;
