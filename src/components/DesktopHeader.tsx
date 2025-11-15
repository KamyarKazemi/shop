import { FaSearch } from "react-icons/fa";
import {
  FaBox,
  FaCodeMerge,
  FaFileLines,
  FaWandMagicSparkles,
  FaBorderNone,
  FaGear,
  FaCartShopping,
} from "react-icons/fa6";
import { useState, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CartContext } from "../contexts/cartContext";
import { Link } from "react-router-dom";

function DesktopHeader() {
  const { cartCount } = useContext(CartContext)!;

  const icons = [
    {
      id: "box",
      icon: (
        <Link to="/">
          <FaBox />
        </Link>
      ),
      label: "Dashboard",
    },
    {
      id: "cart",
      icon: (
        <Link to="/cart">
          <div className="relative">
            <FaCartShopping />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-0.5 text-[0.65rem] font-bold leading-none text-white bg-gradient-to-br from-red-600 to-red-700 rounded-full shadow-lg"
              >
                {cartCount}
              </motion.span>
            )}
          </div>
        </Link>
      ),
      label: "Cart",
    },
    { id: "merge", icon: <FaCodeMerge />, label: "Merge Code" },
    { id: "files", icon: <FaFileLines />, label: "Files" },
    { id: "magic", icon: <FaWandMagicSparkles />, label: "Ai analyze" },
    { id: "border", icon: <FaBorderNone />, label: "Borders" },
    { id: "settings", icon: <FaGear />, label: "Settings" },
    { id: "search", icon: <FaSearch />, label: "Search for an item" },
  ];

  // Start as collapsed (NO HOVER)
  const [isHover, setIsHover] = useState(false);
  const [active, setActive] = useState("box");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Calculate icon reaction based on hover state
  const getIconReaction = (itemId: string) => {
    if (hoveredId === null) return { scale: 1, rotate: 0, opacity: 1 };
    if (hoveredId === itemId) {
      return { scale: 1.3, rotate: 12, opacity: 1 };
    }
    // Other icons react with subtle animations
    const hoveredIdx = icons.findIndex((i) => i.id === hoveredId);
    const currentIdx = icons.findIndex((i) => i.id === itemId);
    const distance = Math.abs(hoveredIdx - currentIdx);

    if (distance === 1) {
      // Adjacent icons get strong reaction
      return {
        scale: 0.85,
        rotate: hoveredIdx < currentIdx ? -8 : 8,
        opacity: 0.6,
      };
    } else if (distance <= 2) {
      // Nearby icons get medium reaction
      return {
        scale: 0.9,
        rotate: 0,
        opacity: 0.7,
      };
    } else {
      // Far icons fade slightly
      return {
        scale: 0.95,
        rotate: 0,
        opacity: 0.5,
      };
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.aside
          initial={{ x: -80 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="z-50 group/aside fixed left-0 bottom-0 h-screen w-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white flex flex-col py-6 shadow-2xl rounded-r-3xl transition-all duration-300 hover:w-60 border-r border-gray-700"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => {
            setIsHover(false);
            setHoveredId(null);
          }}
        >
          {/* Animated background glow */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-purple-500/10 rounded-r-3xl pointer-events-none"
          />

          <div className="z-10 flex flex-col gap-6 mt-6 w-full items-center group-hover/aside:items-start p-3">
            {icons.map((item, idx) => {
              const iconReaction = getIconReaction(item.id);
              const isHoveredIcon = hoveredId === item.id;

              return isHover ? (
                // ✅ Expanded version with reactions
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActive(item.id)}
                  className={`flex flex-col rounded-xl p-1 w-full transition-all duration-300 cursor-pointer relative group ${
                    active === item.id
                      ? "bg-gradient-to-r from-cyan-600/40 to-blue-600/40 text-cyan-300"
                      : "hover:bg-gray-800/50"
                  }`}
                >
                  <div className="z-10 flex flex-row items-center gap-3 p-3">
                    <motion.button
                      animate={{
                        scale: iconReaction.scale,
                        rotate: iconReaction.rotate,
                        opacity: iconReaction.opacity,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: isHoveredIcon ? 300 : 200,
                        damping: 15,
                      }}
                      className="relative group/button text-lg transition-colors duration-200"
                    >
                      {isHoveredIcon && (
                        <>
                          {/* Glow effect on hovered icon */}
                          <motion.div
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                            className="absolute inset-0 bg-cyan-400/50 rounded-full blur-lg pointer-events-none"
                          />
                        </>
                      )}
                      {item.icon}
                    </motion.button>
                    <motion.span
                      animate={{
                        opacity: iconReaction.opacity,
                        scale: iconReaction.scale,
                      }}
                      className="font-semibold text-sm"
                    >
                      {item.label}
                    </motion.span>
                  </div>
                  {active === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-r-lg"
                    />
                  )}
                </motion.div>
              ) : (
                // ✅ Collapsed version with enhanced reactions and tooltip
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setActive(item.id)}
                  className={`relative group/button p-3 rounded-2xl transition-all duration-300 ${
                    active === item.id
                      ? "bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                      : "hover:bg-gray-800/60 text-gray-300 hover:text-white"
                  }`}
                >
                  {/* Container for animated icon */}
                  <motion.span
                    animate={{
                      scale: iconReaction.scale,
                      rotate: iconReaction.rotate,
                      opacity: iconReaction.opacity,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: isHoveredIcon ? 350 : 200,
                      damping: 12,
                    }}
                    className="text-lg inline-block"
                  >
                    {item.icon}
                  </motion.span>

                  {/* Glow pulse on hovered icon */}
                  {isHoveredIcon && (
                    <motion.div
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                      }}
                      className="absolute inset-0 bg-cyan-400/30 rounded-2xl blur-md pointer-events-none"
                    />
                  )}

                  {/* Floating particles on hover */}
                  {isHoveredIcon && (
                    <>
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 1, scale: 0 }}
                          animate={{
                            opacity: 0,
                            scale: 1,
                            y: -30,
                            x: Math.cos((i / 3) * Math.PI * 2) * 20,
                          }}
                          transition={{
                            duration: 1.2,
                            delay: i * 0.15,
                            repeat: Infinity,
                          }}
                          className="absolute w-1 h-1 bg-cyan-400 rounded-full pointer-events-none"
                          style={{
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      ))}
                    </>
                  )}

                  {/* Enhanced tooltip */}
                  {hoveredId === item.id && (
                    <motion.span
                      layoutId="tooltip"
                      initial={{ opacity: 0, x: 10, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.8 }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="absolute left-20 top-1/2 -translate-y-1/2 opacity-100 pointer-events-none transition px-3 py-2 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white text-sm rounded-lg whitespace-nowrap shadow-2xl border border-gray-700 z-50"
                    >
                      {item.label}
                      <motion.div
                        animate={{ scaleY: [0.8, 1, 0.8] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-gray-900"
                        style={{ marginRight: "-1px" }}
                      />
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Decorative bottom element */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mt-auto mb-4 mx-auto w-8 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-60"
          />
        </motion.aside>
      </AnimatePresence>
    </>
  );
}

export default DesktopHeader;
