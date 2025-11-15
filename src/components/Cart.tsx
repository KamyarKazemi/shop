import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { Product } from "../redux/slices/fetchAllProducts";

export default function Cart() {
  const ctx = useContext(CartContext);
  const products = useSelector(
    (state: RootState) => state.fetchAllProductsState.products
  );
  if (!ctx) return null;
  const { cartItems, removeFromCart, updateCartItem, cartCount } = ctx;

  const entries = Object.entries(cartItems) as [string, number][];

  // Helper to parse price values robustly (handles strings like "$12.34")
  const parsePrice = (v: unknown) => {
    if (v == null) return 0;
    const s = String(v);
    // remove any non-numeric except dot and minus
    const cleaned = s.replace(/[^0-9.-]+/g, "");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : 0;
  };

  const total = entries.reduce((acc, [id, qty]) => {
    const pid = Number(id);
    const p = products?.find((x) => x.id === pid);
    const price = p ? parsePrice((p as Product).price) : 0;
    const qtyNum = Number(qty) || 0;
    return acc + price * qtyNum;
  }, 0);

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart ({cartCount})</h2>
      {entries.length === 0 ? (
        <div className="text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="space-y-4 max-w-4xl">
          {entries.map(([id, qty]) => {
            const pid = Number(id);
            const product = products?.find((p) => p.id === pid);
            if (!product) return null;
            const itemPrice = parsePrice((product as Product).price);
            const qtyNum = Number(qty) || 0;
            return (
              <div
                key={id}
                className="flex items-center gap-4 bg-white p-4 rounded shadow"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="font-semibold">{product.title}</div>
                  <div className="text-sm text-gray-500">
                    ${itemPrice.toFixed(2)} each
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded"
                    onClick={() => updateCartItem(pid, qtyNum - 1)}
                  >
                    −
                  </button>
                  <div className="px-3">{qtyNum}</div>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded"
                    onClick={() => updateCartItem(pid, qtyNum + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="w-32 text-right font-semibold">
                  ${(itemPrice * qtyNum).toFixed(2)}
                </div>
                <button
                  className="ml-4 text-sm text-red-600"
                  onClick={() => removeFromCart(pid)}
                >
                  Remove
                </button>
              </div>
            );
          })}

          <div className="flex justify-end items-center gap-4">
            <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
