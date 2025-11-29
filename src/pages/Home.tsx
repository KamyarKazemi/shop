import Products from "../components/Products";
import { motion } from "motion/react";
import { FaShoppingBag, FaTruck, FaAward } from "react-icons/fa";
import { useAnimationOptimization } from "../hooks/useAnimationOptimization";

function Home() {
  const { reduceAnimations } = useAnimationOptimization();
  const features = [
    {
      icon: <FaShoppingBag />,
      label: "Easy Shopping",
      desc: "Browse & buy with ease",
    },
    {
      icon: <FaTruck />,
      label: "Fast Delivery",
      desc: "Quick & reliable shipping",
    },
    {
      icon: <FaAward />,
      label: "Best Quality",
      desc: "Premium products guaranteed",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 overflow-hidden flex items-center justify-center"
      >
        {/* Animated background elements - disabled on reduced motion */}
        {!reduceAnimations && (
          <>
            <motion.div
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ y: [0, 30, 0] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            />
          </>
        )}

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Welcome to <span className="text-yellow-300">ShopHub</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Discover amazing products with incredible prices. Shop smarter, live
            better!
          </motion.p>

          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#products"
            className="inline-block px-8 py-4 bg-yellow-400 text-blue-600 font-bold rounded-xl hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-2xl text-base sm:text-lg"
          >
            Start Shopping Now
          </motion.a>
        </div>

        {/* Floating cards animation - disabled on reduced motion */}
        {!reduceAnimations && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-1/4 left-1/4 text-white/30 text-6xl">
              📦
            </div>
            <div className="absolute top-1/3 right-1/4 text-white/30 text-6xl">
              🛍️
            </div>
            <div className="absolute bottom-1/4 left-1/3 text-white/30 text-6xl">
              💳
            </div>
            <div className="absolute bottom-1/3 right-1/3 text-white/30 text-6xl">
              ⭐
            </div>
          </motion.div>
        )}
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-12 sm:py-20 bg-white border-b border-gray-200"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block p-4 sm:p-5 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-4 group-hover:shadow-lg transition-all duration-300 text-3xl sm:text-4xl text-blue-600"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {feature.label}
                </h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Products Section */}
      <section id="products" className="scroll-mt-20">
        <Products />
      </section>
    </div>
  );
}

export default Home;
