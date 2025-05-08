import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import { Toaster } from './components/ui/sonner';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <Router>
      <CartProvider>
        <Toaster />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}
