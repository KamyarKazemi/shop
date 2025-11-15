import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

function Cart() {
  const { cartItems, removeFromCart, updateCartItem } =
    useContext(CartContext)!;
  const products = useSelector(
    (state: RootState) => state.fetchAllProductsState.products
  );

  const cartProducts = Object.entries(cartItems)
    .map(([productId, qty]) => {
      const product = products?.find((p) => p.id === Number(productId));
      return { product, qty };
    })
    .filter(({ product }) => product !== undefined);

  const total = cartProducts.reduce((sum, { product, qty }) => {
    const price = product?.price;
    const numPrice = typeof price === "string" ? parseFloat(price) : price || 0;
    return sum + numPrice * qty;
  }, 0);

  if (cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-6">
            Start shopping to add items to your cart
          </p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              <FaArrowLeft className="inline mr-2" />
              Back to Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to="/">
            <motion.button
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4"
            >
              <FaArrowLeft /> Back to Shopping
            </motion.button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {cartProducts.map(({ product, qty }, idx) => {
                const price = product?.price;
                const numPrice =
                  typeof price === "string" ? parseFloat(price) : price || 0;
                const itemTotal = numPrice * qty;

                return (
                  <motion.div
                    key={product?.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4 p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                  >
                    {/* Product Image */}
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={product?.image}
                      alt={product?.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {product?.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {product?.caption}
                      </p>
                      <p className="font-bold text-blue-600">
                        ${numPrice.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateCartItem(product?.id || 0, Math.max(0, qty - 1))
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors"
                      >
                        −
                      </motion.button>
                      <span className="w-8 text-center font-semibold">
                        {qty}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateCartItem(
                            product?.id || 0,
                            Math.min(product?.stock || 0, qty + 1)
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors"
                      >
                        +
                      </motion.button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right w-24">
                      <p className="text-lg font-bold text-gray-900">
                        ${itemTotal.toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(product?.id || 0)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </motion.button>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="sticky top-20"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold text-gray-900">
                    ${(total * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-3xl font-bold text-blue-600">
                  ${(total * 1.1).toFixed(2)}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Proceed to Checkout
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-3 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-gray-400 transition-all duration-300"
              >
                Continue Shopping
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
