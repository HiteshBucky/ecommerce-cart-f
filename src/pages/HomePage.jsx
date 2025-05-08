import { useEffect, useState } from 'react';
import { getAllProducts } from '../api';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import UserSelector from '../components/UserSelector';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { cartItems, userId, cartId } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data?.rows || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        toast.error('Failed to load products');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Products</h1>
        <div className='flex gap-4'>
          <UserSelector />
          <Button
            variant='outline'
            className='bg-amber-500 text-white'
            onClick={() => navigate('/cart', { state: { userId, cartId } })}
          >
            View Cart ({cartItems.length})
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {products.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </div>
    </div>
  );
}
