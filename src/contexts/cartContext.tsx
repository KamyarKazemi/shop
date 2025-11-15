import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/thunks/fetchAllProducts";
import type { RootState } from "../redux/store";
import store from "../redux/store";
import Toast from "../components/Toast";

type Notification = {
  text: string;
  type: "error" | "success";
  count?: number; // updated cart count after the action
  product?: { id: number; title: string; price?: string | number };
} | null;

// interface AddedItems {
//   [productId: string]: number;
// }

type CartContextType = {
  cartCount: number;
  cartItems: Record<number, number>;
  handleCart: (productId: number, qty?: number) => boolean;
  removeFromCart: (productId: number) => void;
  updateCartItem: (productId: number, qty: number) => boolean;
  refreshProducts: () => void;
  notification: Notification;
  setNotification: (n: Notification) => void;
  cartEntries: object;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Record<number, number>>({});
  const [notification, setNotification] = useState<Notification>(null);

  const products = useSelector(
    (state: RootState) => state.fetchAllProductsState.products
  );
  const cartEntries = Object.entries(cartItems); // [ [id, qty], [id, qty], ... ]

  // persist cartItems to localStorage (save)
  useEffect(() => {
    try {
      localStorage.setItem("cart_items_v1", JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

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
    // compute new cart count for notification
    const currentCount = Object.values(cartItems).reduce((a, b) => a + b, 0);
    const newCount = currentCount + qty;

    setCartItems((prev) => {
      const updated = { ...prev, [productId]: (prev[productId] ?? 0) + qty };
      console.table(updated);
      return updated;
    });
    // send richer notification including product brief and updated count
    setNotification({
      text: `Added ${qty} item(s) to cart.`,
      type: "success",
      count: newCount,
      product: product
        ? { id: product.id, title: product.title, price: product.price }
        : undefined,
    });
    return true;
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  const updateCartItem = (productId: number, qty: number): boolean => {
    const product = products?.find((p) => p.id === productId);
    const stock = product?.stock ?? 0;
    if (qty > stock) {
      setNotification({
        text: `Cannot set quantity to ${qty}. Only ${stock} item(s) in stock.`,
        type: "error",
      });
      return false;
    }
    if (qty <= 0) {
      removeFromCart(productId);
      return true;
    }
    setCartItems((prev) => ({ ...prev, [productId]: qty }));
    return true;
  };

  const refreshProducts = () => store.dispatch(fetchAllProducts());

  const cartCount = Object.values(cartItems).reduce((acc, v) => acc + v, 0);

  const cartEssentials: CartContextType = {
    cartCount,
    cartEntries,
    cartItems,
    handleCart,
    removeFromCart,
    updateCartItem,
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
