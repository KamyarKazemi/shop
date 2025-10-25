import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/thunks/fetchAllProducts";
import type { RootState } from "../redux/store";
import store from "../redux/store";
import Toast from "../components/Toast";

type Notification = { text: string; type: "error" | "success" } | null;

type CartContextType = {
  cartCount: number;
  cartItems: Record<number, number>;
  handleCart: (productId: number, qty?: number) => boolean;
  refreshProducts: () => void;
  notification: Notification;
  setNotification: (n: Notification) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function CartProvider({ children }: { children: ReactNode }) {
  // ensure products are loaded so we can compute cartCount
  useEffect(() => {
    store.dispatch(fetchAllProducts());
  }, []);

  const products = useSelector(
    (state: RootState) => state.fetchAllProductsState.products
  );

  const [cartItems, setCartItems] = useState<Record<number, number>>({});
  const [notification, setNotification] = useState<Notification>(null);

  // persist cartItems to localStorage (load)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart_items_v1");
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, number>;
        const normalized: Record<number, number> = {};
        Object.entries(parsed).forEach(([k, v]) => {
          const id = Number(k);
          const qty = Number(v) || 0;
          if (!Number.isNaN(id) && qty > 0) normalized[id] = qty;
        });
        setCartItems(normalized);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // persist cartItems to localStorage (save)
  useEffect(() => {
    try {
      localStorage.setItem("cart_items_v1", JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // auto-clear notifications after 3s
  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(t);
  }, [notification]);

  const handleCart = (productId: number, qty = 1): boolean => {
    const product = products?.find((p) => p.id === productId);
    const stock = product?.stock ?? 0;
    const current = cartItems[productId] ?? 0;
    if (current + qty > stock) {
      const remaining = Math.max(0, stock - current);
      // If there are none left, give a clearer out-of-stock message
      if (remaining === 0) {
        setNotification({
          text: `Cannot add any more — item is out of stock.`,
          type: "error",
        });
      } else {
        setNotification({
          text: `Cannot add ${qty} item(s). Only ${remaining} item(s) left in stock.`,
          type: "error",
        });
      }
      return false;
    }

    // Optimistic local update: update cart immediately and notify
    const newCart = { ...cartItems, [productId]: current + qty };
    setCartItems(newCart);
    setNotification({ text: `Added ${qty} item(s) to cart.`, type: "success" });
    return true;
  };

  const refreshProducts = () => store.dispatch(fetchAllProducts());

  const cartCount = Object.values(cartItems).reduce((acc, v) => acc + v, 0);

  const cartEssentials: CartContextType = {
    cartCount,
    cartItems,
    handleCart,
    refreshProducts,
    notification,
    setNotification,
  };

  return (
    <CartContext.Provider value={cartEssentials}>
      {children}
      <Toast notification={notification} setNotification={setNotification} />
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
