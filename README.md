# 🛍️ E-Commerce Frontend – Documentation

---

## 📁 Project Structure

```
src/
├── api/
├── components/
├── context/
├── pages/
```

---


## 🌐 Flow Overview

### 1. **Product Listing (Home Page)**
- Displays a list of products.
- Users can select quantity and add items to cart.

### 2. **Cart Initialization**
- Cart is created or fetched using `fetchOrCreateCart(userId)`.
- Cart items are loaded via `fetchCart(userId)`.

### 3. **Cart State Management (`CartContext`)**
- Maintains shared state across the app:
  - `cartItems`, `quantities`, `discount`
- Provides functions:
  - `addItem(productId, qty)`
  - `removeItem(productId)`
  - `increaseQty(productId)`
  - `decreaseQty(productId)`
  - `getQty(productId)`
  - `getAddedQty(productId)`

### 4. **Discount Handling**
- `getDiscountCode(userId)` is called in `CartPage` on mount.
- If valid, the discount is stored and applied to the total.

### 5. **Checkout**
- On clicking checkout, `checkoutCart()` is called.
- Upon success, the user is redirected to the homepage.

---

## 🧠 Context State Summary (`CartContext.js`)

| State        | Purpose                                 |
|--------------|------------------------------------------|
| `userId`     | Identifies which user's cart is active   |
| `cartId`     | The cart's unique identifier             |
| `cartItems`  | List of items added to the cart          |
| `quantities` | Local state for item quantities          |
| `discount`   | Discount object with code and percentage |

---

## 🧩 Components

### `CartItem`
- Displays:
  - Product image
  - Title and price
  - Quantity controls
  - Remove button

### `CartSummary`
- Shows:
  - Subtotal (base total)
  - Discount applied (if any)
  - Final total
  - Checkout button

---

## 📸 Screenshots

### 🏠 Home Page – Product Listing
![img1](https://github.com/user-attachments/assets/61666f99-48bc-4eb8-86b1-6866c9110f88)

<!-- Image 1: Paste screenshot here -->

---

### 💳 Checkout Page – No Discount
![img2](https://github.com/user-attachments/assets/cc619bf4-a3e9-4474-a51a-f7c53fead971)

<!-- Image 2: Paste screenshot here -->


---

### 🏷️ Checkout Page – With Discount
![img3](https://github.com/user-attachments/assets/cb9b84f2-657d-440a-bf02-583713048585)

<!-- Image 3: Paste screenshot here -->

---

## 🚀 Getting Started

```bash
npm install

npm start
```


## 🚀 Tech Stack

- React
- React Router
- Tailwind Css
- Shadcdn 
- Sonner



## ✅ Features


- 🧾 Global Cart State
- 📦 Add/Remove Products
- 🔁 Quantity Controls
- 🎁 Discount Code Integration
- 💸 Total Calculation
- 🚚 Checkout with Success Feedback
