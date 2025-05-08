import axios from 'axios';

const BASE_URL = 'http://localhost:4040';

export const getAllProducts = async () => {
  const res = await axios.get(`${BASE_URL}/product`);
  return res.data;
};

export const fetchOrCreateCart = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/cart/user/${userId}`);
    if (res.data.status === 404) {
      await axios.post(`${BASE_URL}/cart/user/${userId}`);
      const newCart = await axios.get(`${BASE_URL}/cart/user/${userId}`);

      return newCart.data;
    }

    return res.data;
  } catch (err) {
    console.log('Error fetching cart:', err);
    throw err;
  }
};

export const addItemToCart = async (cartId, productId, quantity) => {
  const res = await axios.post(`${BASE_URL}/cart/${cartId}/item`, {
    productId: productId,
    quantity,
  });
  return res.data;
};

export const fetchCart = async (userId) => {
  const res = await axios.get(`${BASE_URL}/cart/user/${userId}`);
  return res.data;
};

export const removeItemFromCart = async (cartId, productId) => {
  const res = await axios.delete(`${BASE_URL}/cart/${cartId}/item`, {
    data: { productId },
  });
  return res.data;
};

export const checkoutCart = async (cartId, discountCode) => {
  const res = await axios.put(`${BASE_URL}/cart/${cartId}/checkout`, {
    discountCode,
  });
  return res.data;
};

export const getDiscountCode = async () => {
  const res = await axios.get(`${BASE_URL}/cart/discount-code`);
  return res.data;
};
