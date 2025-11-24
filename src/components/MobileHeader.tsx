import { motion, AnimatePresence } from "motion/react";
import { useState, useContext, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/cartContext";
import { useAnimationOptimization } from "../hooks/useAnimationOptimization";
import { useHeaderIcons } from "../contexts/headerIconContext";

function MobileHeader() {
  const { cartCount } = useContext(CartContext)!;
  const { reduceAnimations } = useAnimationOptimization();
  const headerIcons = useHeaderIcons();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredActionId, setHoveredActionId] = useState<string | null>(null);
  const [hoveredMenuId, setHoveredMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Use first 4 icons as quick actions
  const quickActions = headerIcons.slice(0, 4);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMenuOpen]);

  // Interactive icon animation for quick actions
  const getActionStyle = (id: string) => {
    if (hoveredActionId === id) {
      return "bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/50";
    }
    return "bg-white/10 text-white hover:bg-white/20";
  };

  return (
    <>
      {/* Backdrop overlay for menu - full screen */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
          />
        )}
      </AnimatePresence>

      {/* Main Navigation Bar */}
      <motion.header
        ref={headerRef}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="z-50 fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-800 border-t border-slate-700 shadow-2xl"
      >
        {/* Animated background glow - disabled on reduced motion */}
        {!reduceAnimations && (
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 pointer-events-none"
          />
        )}

        <div className="relative z-10 px-3 py-3 sm:px-4 sm:py-4">
          {/* Quick Actions Row */}
          <div className="flex items-center justify-between gap-1 sm:gap-2">
            {/* Menu Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.15, rotate: -5 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex-shrink-0 p-2 sm:p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
              >
                {isMenuOpen ? (
                  <FaTimes className="text-lg sm:text-xl" />
                ) : (
                  <FaBars className="text-lg sm:text-xl" />
                )}
              </motion.div>
            </motion.button>

            {/* Quick Action Buttons */}
            <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 h-full">
              {quickActions.map((action, idx) => {
                const isCart = action.id === "cart";
                const isHovered = hoveredActionId === action.id;

                return (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      hoveredActionId !== null && hoveredActionId !== action.id
                        ? { opacity: 0.4, scale: 1 }
                        : { opacity: 1, scale: 1 }
                    }
                    transition={{
                      delay: idx * 0.08,
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <motion.button
                      onMouseEnter={() => setHoveredActionId(action.id)}
                      onMouseLeave={() => setHoveredActionId(null)}
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.85 }}
                      className={`relative p-2 sm:p-3 rounded-xl transition-all duration-300 flex items-center justify-center ${getActionStyle(
                        action.id
                      )}`}
                    >
                      <motion.div
                        animate={
                          isHovered
                            ? { scale: 1.3, rotate: 10 }
                            : { scale: 1, rotate: 0 }
                        }
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex items-center justify-center text-lg sm:text-xl"
                      >
                        {action.icon}
                      </motion.div>

                      {/* Cart count badge */}
                      {isCart && cartCount > 0 && (
                        <motion.span
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-red-600 to-red-700 text-white text-xs font-bold rounded-full shadow-lg"
                        >
                          {cartCount}
                        </motion.span>
                      )}

                      {/* Tooltip with animation */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.span
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: -40, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gradient-to-br from-slate-800 to-slate-700 text-white text-xs rounded-lg whitespace-nowrap shadow-xl border border-slate-600 pointer-events-none"
                          >
                            {action.label}
                            <motion.div
                              animate={{ scaleY: [0.8, 1, 0.8] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-700 rounded-full"
                            />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>

            {/* Logo/Branding with pulsing animation - disabled on mobile/reduced motion */}
            {!reduceAnimations && (
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="flex-shrink-0 hidden sm:block"
              >
                <Link to="/">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="text-lg font-bold text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text"
                  >
                    Hub
                  </motion.span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Slide-in Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ x: -1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -1000, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="z-50 fixed left-0 top-0 h-full w-full sm:w-96 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-2xl border-r border-slate-700 overflow-y-auto"
          >
            {/* Animated background elements - disabled on reduced motion */}
            {!reduceAnimations && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl pointer-events-none"
                />
                <motion.div
                  animate={{ scale: [1.2, 1, 1.2] }}
                  transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full blur-3xl pointer-events-none"
                />
              </>
            )}

            {/* Menu Header */}
            <div className="sticky top-0 bg-gradient-to-b from-slate-950 via-slate-900 to-transparent p-6 border-b border-slate-700 z-10">
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text mb-2">
                  ShopHub
                </h2>
                {!reduceAnimations && (
                  <motion.p
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-sm text-slate-400"
                  >
                    Welcome back! 👋
                  </motion.p>
                )}
                {reduceAnimations && (
                  <p className="text-sm text-slate-400">Welcome back! 👋</p>
                )}
              </motion.div>
            </div>

            {/* Menu Items Grid */}
            <nav className="relative p-6 grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-4">
              {headerIcons.map((item, idx) => {
                const isHovered = hoveredMenuId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      delay: idx * 0.12,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    <motion.button
                      onMouseEnter={() => setHoveredMenuId(item.id)}
                      onMouseLeave={() => setHoveredMenuId(null)}
                      onClick={() => setIsMenuOpen(false)}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.92 }}
                      className="w-full relative group overflow-hidden"
                    >
                      {/* Gradient background */}
                      <motion.div
                        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl pointer-events-none"
                      />

                      {/* Content */}
                      <div className="relative px-4 py-6 rounded-2xl border-2 border-slate-700 group-hover:border-blue-500 transition-all duration-300 flex flex-col items-center gap-3">
                        <motion.div
                          animate={
                            isHovered
                              ? {
                                  scale: 1.3,
                                  rotate: 15,
                                  y: -3,
                                }
                              : { scale: 1, rotate: 0, y: 0 }
                          }
                          transition={{ type: "spring", stiffness: 300 }}
                          className="text-2xl sm:text-3xl flex items-center justify-center"
                        >
                          {item.icon}
                        </motion.div>

                        <motion.span
                          animate={
                            isHovered
                              ? { color: "#06b6d4", scale: 1 }
                              : { color: "#cbd5e1", scale: 0.95 }
                          }
                          className="font-semibold text-sm sm:text-base text-slate-300"
                        >
                          {item.label}
                        </motion.span>

                        {/* Floating particles on hover - disabled on reduced motion */}
                        {isHovered && !reduceAnimations && (
                          <>
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 1, scale: 0 }}
                                animate={{
                                  opacity: 0,
                                  scale: 1,
                                  y: -40,
                                  x: Math.cos((i / 3) * Math.PI * 2) * 30,
                                }}
                                transition={{
                                  duration: 1,
                                  delay: i * 0.1,
                                }}
                                className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full pointer-events-none"
                                style={{
                                  left: "50%",
                                  top: "50%",
                                  transform: "translate(-50%, -50%)",
                                }}
                              />
                            ))}
                          </>
                        )}
                      </div>
                    </motion.button>
                  </motion.div>
                );
              })}
            </nav>

            {/* Menu Footer */}
            <div className="sticky bottom-0 bg-gradient-to-t from-slate-950 via-slate-900 to-transparent p-6 border-t border-slate-700 space-y-3">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-700 hover:via-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🛍️ Shop Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="w-full py-2 px-4 rounded-xl border-2 border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 transition-all duration-300 font-medium"
              >
                ✕ Close Menu
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MobileHeader;
