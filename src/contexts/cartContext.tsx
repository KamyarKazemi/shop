import { createContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const handleCart = (id) => {
    setCartCount((prev) => prev + 1);
  };

  const cartEssentials = {
    cartCount,
    handleCart,
  };

  return (
    <CartContext.Provider value={cartEssentials}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
