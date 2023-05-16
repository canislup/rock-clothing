import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // Find if cart item contains productToAdd
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  // If found, increment quantity
  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  // return new array with modified cartItems/ new cart items
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeItem = (cartItems, item) => {
  // Checks if cart is empty
  if (!cartItems || cartItems === [] || item.quantity === 0) return;

  //
  return [...cartItems, { ...item, quantity: item.quantity-- }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  cartValue: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartValue, setCartValue] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (accumulator, currentItem) => accumulator + currentItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartValue = cartItems.reduce(
      (accumulator, currentItem) =>
        currentItem.quantity > 1
          ? accumulator + currentItem.quantity * currentItem.price
          : accumulator + currentItem.price,
      0
    );
    console.log(newCartValue);
    setCartValue(newCartValue);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (item) => {
    setCartItems(removeItem(cartItems, item));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    cartValue,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
