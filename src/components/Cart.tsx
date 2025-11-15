import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { Product } from "../redux/slices/fetchAllProducts";
import { motion } from "motion/react";
import { FaTrash } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";

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

  const isEmpty = entries.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 sm:p-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-3"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaShoppingBag className="text-3xl text-blue-600" />
          </motion.div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Your Cart
            </h1>
            <p className="text-gray-600 text-sm">
              {cartCount} item{cartCount !== 1 ? "s" : ""} in your cart
            </p>
          </div>
        </motion.div>

        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6"
            >
              <FaShoppingBag className="text-6xl text-gray-300" />
            </motion.div>
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            >
              Continue Shopping
            </motion.a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-4"
            >
              {entries.map(([id, qty], idx) => {
                const pid = Number(id);
                const product = products?.find((p) => p.id === pid);
                if (!product) return null;
                const itemPrice = parsePrice((product as Product).price);
                const qtyNum = Number(qty) || 0;
                const subtotal = itemPrice * qtyNum;

                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ x: 4 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    {/* Product image */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-gray-100"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Product details */}
                    <div className="flex-1">
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        ${itemPrice.toFixed(2)} each
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-2 border border-blue-200">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateCartItem(pid, qtyNum - 1)}
                        className="px-3 py-2 bg-white rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 font-bold transition-colors duration-200"
                      >
                        −
                      </motion.button>
                      <motion.div
                        key={qtyNum}
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 0.3 }}
                        className="px-4 font-bold text-blue-600 min-w-[40px] text-center"
                      >
                        {qtyNum}
                      </motion.div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateCartItem(pid, qtyNum + 1)}
                        className="px-3 py-2 bg-white rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-600 font-bold transition-colors duration-200"
                      >
                        +
                      </motion.button>
                    </div>

                    {/* Subtotal */}
                    <motion.div
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      className="font-bold text-lg text-gray-900 min-w-[80px] text-right"
                    >
                      ${subtotal.toFixed(2)}
                    </motion.div>

                    {/* Remove button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(pid)}
                      className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
                      aria-label="Remove item from cart"
                    >
                      <FaTrash />
                    </motion.button>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Order summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1 sticky top-8"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </motion.div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax</span>
                    <span>${(total * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex justify-between items-center mb-6"
                >
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${(total * 1.1).toFixed(2)}
                  </span>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Proceed to Checkout
                </motion.button>

                <motion.a
                  href="/"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-3 py-3 border-2 border-gray-300 text-gray-900 font-bold rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 inline-block text-center"
                >
                  Continue Shopping
                </motion.a>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
