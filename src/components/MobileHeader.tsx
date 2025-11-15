import { motion, AnimatePresence } from "motion/react";
import styles from "../css/header.module.css";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  FaBox,
  FaGear,
  FaWandMagicSparkles,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

function MobileHeader() {
  const [isHover, setIsHover] = useState(false);
  const [isIconHovered, setIsHovered] = useState(false);
  const [hoveredIconId, setHoveredIconId] = useState(null);
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  const icons = [
    {
      id: "box",
      icon: (
        <>
          <Link to="/">
            <div
              className={`z-10 flex items-center gap-3 bg-black p-2 text-white rounded-2xl`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => toggleDropdown()}
            >
              <FaBox />
              {isDropdownShown ? (
                <FaArrowUp
                  className={` transition-all duration-300 ${
                    isIconHovered ? "text-[1.2rem]" : "text-[0.9rem]"
                  }`}
                />
              ) : (
                <FaArrowDown
                  className={` transition-all duration-300 ${
                    isIconHovered ? "text-[1.2rem]" : "text-[0.9rem]"
                  }`}
                />
              )}
            </div>
          </Link>
        </>
      ),
      label: "Dashboard",
    },
    { id: "search", icon: <FaSearch />, label: "Search for an item" },
    { id: "magic", icon: <FaWandMagicSparkles />, label: "Ai analyze" },
    { id: "settings", icon: <FaGear />, label: "Settings" },
  ];

  const toggleDropdown = () => {
    setIsDropdownShown((prev) => !prev);
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={`z-10 fixed bottom-0 bg-blue-600 w-full p-2 transition-all duration-300 ${
          isHover ? "rounded-none p-3" : "rounded-2xl p-3"
        } ${styles.header}`}
      >
        <div className="z-10 flex items-center justify-around">
          {icons.map((item) => (
            <motion.button
              key={item.id}
              onMouseEnter={() => setHoveredIconId(item.id)}
              onMouseLeave={() => setHoveredIconId(null)}
              className={`text-[1.3rem] transition-all duration-300 ${
                hoveredIconId === item.id ? "border-b-2 pb-1" : ""
              }`}
            >
              {item.icon}
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {isDropdownShown ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="z-10 fixed bottom-20 left-6 bg-black text-white p-5 rounded"
          >
            <div className="z-10 flex flex-col items-center gap-3 text-[1.2rem]">
              <span>item</span>
              <span>item</span>
              <span>item</span>
              <span>item</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default MobileHeader;
