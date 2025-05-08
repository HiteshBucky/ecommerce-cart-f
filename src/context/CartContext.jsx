import { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchOrCreateCart,
  fetchCart,
  addItemToCart as apiAddItem,
  removeItemFromCart as apiRemoveItem,
  getDiscountCode as apiGetDiscountCode,
} from '../api';
import { toast } from 'sonner';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(null);
  const [userId, setUserId] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [discount, setDiscount] = useState(null);

  useEffect(() => {
    if (userId) initCart(userId);
  }, [userId]);

  const initCart = async (uid) => {
    try {
      const res = await fetchOrCreateCart(uid);
      setCartId(res.data.cart.id);
      await loadCartItems(uid);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to initialize cart');
    }
  };

  const loadCartItems = async (uid) => {
    try {
      const res = await fetchCart(uid);
      const items = res.data.items || [];
      setCartItems(items);

      const qtyMap = {};
      items.forEach((item) => {
        qtyMap[item.productId] = item.quantity;
      });
      setQuantities(qtyMap);
    } catch (err) {
      console.error('Error loading cart items:', err);
      toast.error('Could not load cart items');
    }
  };

  const addItem = async (productId, qty = 1) => {
    try {
      await apiAddItem(cartId, productId, qty);
      toast.success('Item added');
      await loadCartItems(userId);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Add failed');
    }
  };

  const removeItem = async (productId) => {
    try {
      await apiRemoveItem(cartId, productId);
      toast.success('Item removed');
      await loadCartItems(userId);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Remove failed');
    }
  };

  const increaseQty = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const decreaseQty = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1),
    }));
  };

  const getQty = (productId) => quantities[productId] || 1;
  const getAddedQty = (productId) => {
    const item = cartItems.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const getDiscountCode = async () => {
    try {
      const res = await apiGetDiscountCode(userId);
      setDiscount(res.data);
    } catch {
      // Handle error if needed
    }
  };

  return (
    <CartContext.Provider
      value={{
        userId,
        setUserId,
        cartId,
        cartItems,
        quantities,
        addItem,
        removeItem,
        increaseQty,
        decreaseQty,
        getQty,
        getAddedQty,
        loadCartItems,
        discount,
        getDiscountCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
