import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/cartContext";
import { FaStar, FaArrowLeft, FaShoppingCart, FaCheck } from "react-icons/fa";
import { useAnimationOptimization } from "../hooks/useAnimationOptimization";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.fetchAllProductsState);
  const { handleCart, cartItems } = useContext(CartContext);
  const { reduceAnimations, isMobile } = useAnimationOptimization();

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedComment, setSelectedComment] = useState(null);

  const product = products?.find((p) => p.id === Number(id));

  useEffect(() => {
    if (id && cartItems[Number(id)]) {
      setQuantity(cartItems[Number(id)]);
    }
  }, [id, cartItems]);

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
      >
        <div className="text-center">
          <motion.div
            animate={reduceAnimations ? {} : { rotate: 360 }}
            transition={
              reduceAnimations
                ? {}
                : { duration: 2, repeat: Infinity, ease: "linear" }
            }
            className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400">Product not found</p>
        </div>
      </motion.div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      handleCart(product.id);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const ratingAvg =
    product.comments.length > 0
      ? (
          product.comments.reduce((sum, c) => sum + c.rating, 0) /
          product.comments.length
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      {/* Animated background - disabled on reduced motion */}
      {!reduceAnimations && (
        <>
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl -z-10"
          />
          <motion.div
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
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

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
          >
            <FaArrowLeft size={20} />
            <span className="hidden sm:inline">Back</span>
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery - Left side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {/* Main image */}
            <motion.div
              layoutId={`product-image-${product.id}`}
              className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl lg:rounded-3xl overflow-hidden aspect-square shadow-2xl"
            >
              <motion.img
                key={`image-${activeImageIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                className={`absolute top-6 right-6 px-4 py-3 rounded-full font-bold text-sm sm:text-base shadow-lg ${
                  product.stock > 5
                    ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
                    : product.stock > 0
                    ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white"
                    : "bg-gradient-to-r from-red-400 to-red-500 text-white"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </motion.div>

              {/* Discount badge (if applicable) */}
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                className="absolute top-6 left-6 px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-xs sm:text-sm font-bold shadow-lg"
              >
                Premium
              </motion.div>
            </motion.div>

            {/* Image indicators */}
            <div className="flex justify-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveImageIndex(0)}
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  activeImageIndex === 0
                    ? "border-blue-600 shadow-lg"
                    : "border-gray-300 dark:border-slate-600 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={product.image}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              </motion.button>
            </div>
          </motion.div>

          {/* Product Info - Right side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Title section */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                  {product.title}
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6">
                  {product.caption}
                </p>
              </motion.div>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-2 mb-6"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <FaStar
                        size={20}
                        className={
                          i < Math.round(Number(ratingAvg))
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-slate-600"
                        }
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  {ratingAvg} ({product.comments.length} reviews)
                </span>
              </motion.div>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-6"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">
                    ${product.price}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${(parseFloat(product.price) * 1.2).toFixed(2)}
                  </span>
                  <span className="text-sm font-semibold text-green-600 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                    Save 20%
                  </span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8"
              >
                {product.details}
              </motion.p>
            </div>

            {/* Action section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="space-y-4 mt-4 lg:mt-6"
            >
              {/* Quantity selector */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-slate-700 shadow-lg">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={product.stock === 0}
                    className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 font-bold text-xl transition-colors duration-200 disabled:opacity-50"
                  >
                    −
                  </motion.button>

                  <motion.div
                    key={quantity}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 text-center"
                  >
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => {
                        const val = Math.min(
                          Math.max(1, Number(e.target.value)),
                          product.stock
                        );
                        setQuantity(val);
                      }}
                      className="w-full text-center text-2xl font-bold bg-transparent text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 outline-none"
                    />
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    disabled={quantity >= product.stock || product.stock === 0}
                    className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 font-bold text-xl transition-colors duration-200 disabled:opacity-50"
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {/* Add to cart button */}
              <AnimatePresence mode="wait">
                {!isAdded ? (
                  <motion.button
                    key="add-btn"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    whileHover={product.stock > 0 ? { scale: 1.05, y: -2 } : {}}
                    whileTap={product.stock > 0 ? { scale: 0.95 } : {}}
                    className={`w-full py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl ${
                      product.stock > 0
                        ? "bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 text-white hover:from-blue-600 hover:via-blue-700 hover:to-cyan-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <FaShoppingCart size={24} />
                    <span>
                      {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                    </span>
                  </motion.button>
                ) : (
                  <motion.button
                    key="success-btn"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    disabled
                    className="w-full py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl bg-gradient-to-r from-green-400 to-green-600 text-white flex items-center justify-center gap-3 shadow-lg"
                  >
                    <motion.div
                      animate={reduceAnimations ? {} : { rotate: 360 }}
                      transition={
                        reduceAnimations
                          ? {}
                          : { duration: 0.6, type: "spring" }
                      }
                    >
                      <FaCheck size={24} />
                    </motion.div>
                    <span>Added to Cart!</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        {/* Reviews section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 sm:mt-20 lg:mt-24"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12">
            Customer Reviews
          </h2>

          {product.comments.length > 0 ? (
            <div
              className={`grid grid-cols-1 ${
                isMobile ? "gap-4" : "md:grid-cols-2 gap-6"
              } lg:grid-cols-3 gap-6`}
            >
              {product.comments.map((comment, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: reduceAnimations ? 0 : idx * 0.1,
                  }}
                  viewport={{ once: true }}
                  whileHover={!reduceAnimations ? { y: -4 } : {}}
                  onClick={() =>
                    !reduceAnimations &&
                    setSelectedComment(selectedComment === idx ? null : idx)
                  }
                  className="cursor-pointer"
                >
                  <motion.div
                    layoutId={`comment-${idx}`}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <FaStar
                            size={16}
                            className={
                              i < comment.rating
                                ? "text-yellow-400"
                                : "text-gray-300 dark:text-slate-600"
                            }
                          />
                        </motion.div>
                      ))}
                      <span className="ml-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {comment.rating}/5
                      </span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
                      {comment.user}
                    </p>

                    <motion.p
                      animate={
                        selectedComment === idx && !reduceAnimations
                          ? { maxHeight: 200 }
                          : { maxHeight: 60 }
                      }
                      transition={{ duration: 0.3 }}
                      className="text-gray-600 dark:text-gray-400 flex-1 overflow-hidden"
                    >
                      {comment.text}
                    </motion.p>

                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: selectedComment === idx ? 1 : 0.6 }}
                      className="text-xs text-blue-600 dark:text-blue-400 mt-3 font-semibold"
                    >
                      {selectedComment === idx ? "Show less" : "Show more"}
                    </motion.span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-gray-200 dark:border-slate-700"
            >
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No reviews yet. Be the first to review this product!
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Related products placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 sm:mt-20 lg:mt-24 pb-8 sm:pb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12">
            Specifications
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-slate-700 shadow-lg"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Product Name
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {product.title}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Price
                </span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  ${product.price}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Stock Available
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {product.stock} units
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Customer Rating
                </span>
                <span className="text-lg font-bold text-yellow-500">
                  {ratingAvg} / 5.0
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ProductPage;
