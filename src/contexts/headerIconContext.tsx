import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FaSearch } from "react-icons/fa";
import {
  FaBox,
  FaCircleUser,
  FaFileLines,
  FaWandMagicSparkles,
  FaBorderNone,
  FaGear,
  FaCartShopping,
} from "react-icons/fa6";
import { CartContext } from "./cartContext";

export const useHeaderIcons = () => {
  const { cartCount } = useContext(CartContext);

  return [
    {
      id: "box",
      icon: (
        <Link to="/">
          <FaBox className="text-[#ccc]" />
        </Link>
      ),
      label: "Dashboard",
    },
    {
      id: "cart",
      icon: (
        <Link to="/cart">
          <div className="relative">
            <FaCartShopping className="text-[#ccc]" />
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
    {
      id: "profile",
      icon: (
        <Link to="/profile">
          <FaCircleUser className="text-[#ccc]" />
        </Link>
      ),
      label: "Profile",
    },
    {
      id: "files",
      icon: <FaFileLines className="text-[#ccc]" />,
      label: "Files",
    },
    {
      id: "magic",
      icon: <FaWandMagicSparkles className="text-[#ccc]" />,
      label: "Ai analyze",
    },
    {
      id: "border",
      icon: <FaBorderNone className="text-[#ccc]" />,
      label: "Borders",
    },
    {
      id: "settings",
      icon: <FaGear className="text-[#ccc]" />,
      label: "Settings",
    },
    {
      id: "search",
      icon: <FaSearch className="text-[#ccc]" />,
      label: "Search for an item",
    },
  ];
};
