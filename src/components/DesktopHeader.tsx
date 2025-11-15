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
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-0.5 text-[0.65rem] font-bold leading-none text-white bg-red-600 rounded-full">
                {cartCount}
              </span>
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

  return (
    <>
      <AnimatePresence>
        <aside
          className="z-10 group/aside fixed left-0 bottom-0 h-screen w-20 bg-gray-900 text-white flex flex-col py-6 shadow-2xl rounded-r-2xl transition-all duration-300 hover:w-60"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="z-10 flex flex-col gap-8 mt-6 w-full items-center group-hover/aside:items-start p-3">
            {icons.map((item) =>
              isHover ? (
                // ✅ Expanded version
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`flex flex-col rounded-xl p-1 w-full transition-all duration-300 ${
                    active === item.id
                      ? "bg-gray-700 text-cyan-700"
                      : "hover:bg-gray-800"
                  }`}
                >
                  <div className="z-10 flex flex-row items-center gap-3 p-2">
                    <button className="relative group/button">
                      {item.icon}
                    </button>
                    <span>{item.label}</span>
                  </div>
                </motion.div>
              ) : (
                // ✅ Your original button with tooltip — UNTOUCHED
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`relative group/button p-3 rounded-xl transition-all duration-300 ${
                    active === item.id
                      ? "bg-gray-700 text-cyan-700"
                      : "hover:bg-gray-800"
                  }`}
                >
                  {item.icon}
                  {isHover ? null : (
                    <span className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover/button:opacity-100 pointer-events-none transition bg-gray-800 text-white text-sm px-2 py-1 rounded-md whitespace-nowrap shadow-lg">
                      {item.label}
                    </span>
                  )}
                </motion.button>
              )
            )}
          </div>
        </aside>
      </AnimatePresence>
    </>
  );
}

export default DesktopHeader;
