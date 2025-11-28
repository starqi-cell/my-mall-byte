// src/App.tsx
// 入口组件

import { FC,useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';
import CartDrawer from './components/CartDrawer';
import { StyledLayout, StyledContent, StyledFooter } from './style';
import { useAppDispatch } from './store';

import { fetchCategory } from './pages/store/categorySlice';

const App: FC = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
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
