import { motion, AnimatePresence } from "motion/react";
import styles from "../css/header.module.css";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaBox, FaGear, FaWandMagicSparkles } from "react-icons/fa6";

function MobileHeader() {
  const [isHover, setIsHover] = useState(false);

  const icons = [
    { id: "box", icon: <FaBox />, label: "Dashboard" },
    { id: "search", icon: <FaSearch />, label: "Search for an item" },
    { id: "magic", icon: <FaWandMagicSparkles />, label: "Ai analyze" },
    { id: "settings", icon: <FaGear />, label: "Settings" },
  ];

  return (
    <>
      <AnimatePresence>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className={`fixed bottom-0 bg-blue-600 w-full p-2 transition-all duration-300 ${
            isHover ? "rounded-none p-4" : "rounded-2xl p-3"
          } ${styles.header}`}
        >
          <div className="flex items-center justify-around">
            {icons.map((item) => (
              <motion.button className="text-[1.3rem]" key={item.id}>
                {item.icon}
              </motion.button>
            ))}
          </div>
        </div>
      </AnimatePresence>
    </>
  );
}

export default MobileHeader;
