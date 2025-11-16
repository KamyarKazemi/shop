import { useSelector } from "react-redux";
import type { Product } from "../redux/slices/fetchAllProducts";
import { useState, useContext } from "react";
import type { RootState } from "../redux/store";
import { CartContext } from "../contexts/cartContext";
import { motion } from "motion/react";
import { useAnimationOptimization } from "../hooks/useAnimationOptimization";

function ProductCard() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { handleCart, cartItems, updateCartItem } = useContext(CartContext)!;
  const { reduceAnimations } = useAnimationOptimization();

  const { products, productsStatus, productsError } = useSelector(
    (state: RootState) => state.fetchAllProductsState
  );

  if (productsStatus === "loading") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen"
      >
        <motion.div
          animate={reduceAnimations ? {} : { rotate: 360 }}
          transition={
            reduceAnimations
              ? {}
              : { duration: 2, repeat: Infinity, ease: "linear" }
          }
          className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full"
        />
      </motion.div>
    );
  }

  if (productsStatus === "failed") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center min-h-screen"
      >
        <h3 className="text-2xl font-semibold text-red-600">
          Error: {productsError}
        </h3>
      </motion.div>
    );
  }

  return (
    <div className="z-0 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-6 lg:p-8 relative overflow-hidden transition-colors duration-300">
      {/* Animated background elements - disabled on reduced motion */}
      {!reduceAnimations && (
        <>
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl -z-10"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-300/20 to-blue-300/20 rounded-full blur-3xl -z-10"
          />
        </>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-full mx-auto"
      >
        {products?.map((product: Product, idx: number) => {
          const isHovered = hoveredId === product.id;
          const itemInCart = (cartItems[product.id] ?? 0) > 0;
          // Reduce stagger delay on mobile
          const staggerDelay = reduceAnimations ? 0 : idx * 0.02;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: staggerDelay }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative h-full group"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                animate={isHovered && !reduceAnimations ? { y: -8 } : { y: 0 }}
                transition={{ duration: 0.2 }}
                className="relative bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg dark:shadow-slate-900/30 h-full flex flex-col transition-all duration-300"
              >
                {/* Product image container */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 aspect-square">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    animate={
                      isHovered && !reduceAnimations
                        ? { scale: 1.15 }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay gradient on hover */}
                  <motion.div
                    animate={
                      isHovered && !reduceAnimations
                        ? { opacity: 1 }
                        : { opacity: 0 }
                    }
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                  />

                  {/* Stock badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={`absolute top-2 right-2 sm:top-4 sm:right-4 px-2 py-1 sm:px-3 sm:py-2 rounded-full font-bold text-xs sm:text-sm ${
                      product.stock > 5
                        ? "bg-green-500/90 text-white"
                        : product.stock > 0
                        ? "bg-orange-500/90 text-white"
                        : "bg-red-500/90 text-white"
                    }`}
                  >
                    {product.stock > 0 ? `${product.stock}in` : "Out"}
                  </motion.div>
                </div>

                {/* Content section */}
                <div className="p-2 xs:p-3 sm:p-4 md:p-5 flex flex-col flex-1">
                  {/* Title and rating */}
                  <motion.h3
                    animate={
                      isHovered ? { color: "#0369a1" } : { color: "#1f2937" }
                    }
                    className="text-xs sm:text-sm md:text-base lg:text-lg font-bold line-clamp-2 mb-1 sm:mb-2 transition-colors duration-300 dark:text-white"
                  >
                    {product.title}
                  </motion.h3>

                  {/* Price and description */}
                  <div className="flex-1 mb-2 sm:mb-3 md:mb-4">
                    <motion.span
                      animate={
                        isHovered
                          ? { fontSize: "1.1rem" }
                          : { fontSize: "0.9rem" }
                      }
                      className="text-blue-600 font-bold block transition-all duration-300"
                    >
                      ${product.price}
                    </motion.span>
                    {!isHovered && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1"
                      >
                        {product.caption}
                      </motion.p>
                    )}
                  </div>

                  {/* Details - expanded on hover */}
                  <motion.div
                    animate={
                      isHovered && !reduceAnimations
                        ? { opacity: 1, height: "auto" }
                        : { opacity: 0, height: 0 }
                    }
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mb-4"
                  >
                    <motion.p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-slate-600">
                      {product.details}
                    </motion.p>
                  </motion.div>

                  {/* Action buttons */}
                  <div className="space-y-1 sm:space-y-2 md:space-y-3 border-t border-gray-200 pt-2 sm:pt-3 md:pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleCart(product.id);
                      }}
                      disabled={product.stock <= 0}
                      className={`w-full font-semibold py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 text-xs sm:text-sm md:text-base ${
                        product.stock <= 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
                      }`}
                    >
                      {product.stock > 0 ? "Add" : "Out"}
                    </motion.button>

                    {/* Inline quantity controls */}
                    {product.stock > 0 && itemInCart ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-600 rounded-lg sm:rounded-xl p-1 sm:p-2 border border-blue-200 dark:border-slate-500"
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            updateCartItem(
                              product.id,
                              (cartItems[product.id] ?? 0) - 1
                            )
                          }
                          className="flex-1 px-1 sm:px-2 py-0.5 sm:py-1 bg-white dark:bg-slate-600 rounded text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-bold text-sm transition-colors duration-200"
                        >
                          −
                        </motion.button>
                        <motion.div
                          key={cartItems[product.id]}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.3 }}
                          className="flex-1 text-center font-bold text-blue-600 dark:text-blue-400 text-xs sm:text-sm"
                        >
                          {cartItems[product.id]}
                        </motion.div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            updateCartItem(
                              product.id,
                              (cartItems[product.id] ?? 0) + 1
                            )
                          }
                          className="flex-1 px-1 sm:px-2 py-0.5 sm:py-1 bg-white rounded text-gray-700 hover:text-green-600 font-bold text-sm transition-colors duration-200"
                        >
                          +
                        </motion.button>
                      </motion.div>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default ProductCard;
