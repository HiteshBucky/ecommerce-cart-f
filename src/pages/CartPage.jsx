import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { checkoutCart } from '../api';

const productImages = Array.from(
  { length: 10 },
  (_, i) => `https://picsum.photos/300/200?random=${i + 1}`
);

export default function CartPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { userId } = state || {};
  const {
    cartId,
    cartItems,
    discount,
    getDiscountCode,
    increaseQty,
    removeItem,
    loadCartItems,
  } = useCart();

  useEffect(() => {
    if (!userId) {
      toast.error('User not found. Redirecting to home.');
      navigate('/');
      return;
    }

    // Fetch the discount code for the user/cart
    getDiscountCode(userId);
  }, [userId, navigate]);

  const handleCheckout = async () => {
    try {
      console.log('Checkout initiated');

      await checkoutCart(cartId, discount?.code);
      toast.success('Checkout successful!');
      loadCartItems(userId); // Reload cart items after checkout
      navigate('/');
    } catch {
      toast.error('Checkout failed');
    }
  };

  // Calculate base and final totals
  const baseTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );
  const finalTotal = discount
    ? Math.round(baseTotal * (1 - discount.discountPercent / 100))
    : baseTotal;

  return (
    <div className='p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 min-h-screen'>
      <div className='md:col-span-2'>
        <h1 className='text-3xl font-bold mb-6 text-gray-800'>🛒 Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className='text-gray-500'>Your cart is empty.</p>
        ) : (
          cartItems.map((item, idx) => (
            <CartItem
              key={item.id}
              item={item}
              image={productImages[idx % productImages.length]}
              onIncrease={increaseQty}
              onRemove={removeItem}
            />
          ))
        )}
      </div>

      <CartSummary
        items={cartItems}
        discount={discount}
        baseTotal={baseTotal}
        finalTotal={finalTotal}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
