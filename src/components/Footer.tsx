import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaArrowUp,
  FaPaperPlane,
  FaHeart,
} from "react-icons/fa6";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useAnimationOptimization } from "../hooks/useAnimationOptimization";

export default function Footer() {
  const { reduceAnimations } = useAnimationOptimization();
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [emailFocused, setEmailFocused] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleLoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHeartPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
  };

  const socialIcons = [
    {
      id: "facebook",
      icon: FaFacebook,
      color: "from-blue-600 to-blue-500",
      hoverColor: "hover:from-blue-700 hover:to-blue-600",
      label: "Facebook",
    },
    {
      id: "twitter",
      icon: FaTwitter,
      color: "from-sky-500 to-cyan-500",
      hoverColor: "hover:from-sky-600 hover:to-cyan-600",
      label: "Twitter",
    },
    {
      id: "instagram",
      icon: FaInstagram,
      color: "from-pink-600 to-purple-600",
      hoverColor: "hover:from-pink-700 hover:to-purple-700",
      label: "Instagram",
    },
    {
      id: "linkedin",
      icon: FaLinkedin,
      color: "from-blue-700 to-blue-600",
      hoverColor: "hover:from-blue-800 hover:to-blue-700",
      label: "LinkedIn",
    },
  ];

  const footerSections = [
    {
      title: "Quick Links",
      delay: 0.1,
      links: [
        { label: "Home", href: "/" },
        { label: "Products", href: "#products" },
        { label: "About Us", href: "#about" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Support",
      delay: 0.2,
      links: [
        { label: "FAQ", href: "#faq" },
        { label: "Shipping Info", href: "#shipping" },
        { label: "Returns & Exchanges", href: "#returns" },
        { label: "Customer Support", href: "#support" },
      ],
    },
    {
      title: "Legal",
      delay: 0.3,
      links: [
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" },
        { label: "Cookie Settings", href: "#cookies" },
        { label: "Accessibility", href: "#access" },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 mt-auto relative overflow-hidden z-0">
      {/* Animated background elements - disabled on reduced motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {!reduceAnimations && (
          <>
            <motion.div
              animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-10 w-64 h-64 bg-blue-500 opacity-5 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 opacity-5 rounded-full blur-3xl"
            />
          </>
        )}
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                ShopHub
              </h2>
            </motion.div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Discover amazing products curated just for you. Quality,
              affordability, and style in every purchase. Join thousands of
              satisfied customers.
            </p>

            {/* Social icons */}
            <div className="flex gap-4 pt-4">
              {socialIcons.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.id}
                    href="#"
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.05 * idx }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    whileTap={{ scale: 0.85 }}
                    onMouseEnter={() => setHoveredSocial(social.id)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${social.color} ${social.hoverColor} rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer relative group`}
                  >
                    <Icon className="text-lg text-white relative z-10" />
                    {hoveredSocial === social.id && (
                      <motion.span
                        layoutId="tooltip"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: -40 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full mb-2 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-full whitespace-nowrap shadow-lg z-20"
                      >
                        {social.label}
                      </motion.span>
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* Love button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={handleLoveClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-red-500 transition-colors duration-300"
              >
                <motion.span
                  animate={showHeart ? { scale: [1, 1.5, 0] } : { scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block"
                >
                  <FaHeart className="text-sm" />
                </motion.span>
                <span className="hover:underline">Love ShopHub?</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Footer sections */}
          {footerSections.map((section) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: section.delay }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-5"
            >
              <h3 className="text-lg font-semibold text-white relative inline-block">
                {section.title}
                <motion.div
                  layoutId={`underline-${section.title}`}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.6, delay: section.delay + 0.3 }}
                  viewport={{ once: true }}
                />
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, idx) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: section.delay + 0.1 + idx * 0.05,
                    }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-blue-400 transition-all duration-200 relative"
                    >
                      <span className="relative inline-block">
                        {link.label}
                        <motion.span
                          className="absolute bottom-0 left-0 h-0.5 bg-blue-500 rounded"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-1 space-y-5"
          >
            <h3 className="text-lg font-semibold text-white">Stay Connected</h3>
            <p className="text-sm text-slate-400">
              Get exclusive offers and latest updates.
            </p>
            <form className="space-y-3" onSubmit={handleSubscribe}>
              <motion.div
                animate={emailFocused ? { scale: 1.02 } : { scale: 1 }}
                className="relative"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-slate-800 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 border border-slate-700 hover:border-slate-600"
                  aria-label="Email for newsletter"
                />
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <motion.span
                  animate={subscribed ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaPaperPlane className="text-sm" />
                </motion.span>
                <span>{subscribed ? "Subscribed!" : "Subscribe"}</span>
              </motion.button>
            </form>

            {subscribed && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs text-green-400 text-center"
              >
                ✓ Thanks for subscribing!
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-slate-700 my-10 md:my-12"
        />

        {/* Bottom bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-sm text-slate-500"
          >
            © {currentYear} ShopHub. Made with{" "}
            {!reduceAnimations ? (
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 1 }}
                className="text-red-500 inline-block"
              >
                ♥
              </motion.span>
            ) : (
              <span className="text-red-500 inline-block">♥</span>
            )}{" "}
            All rights reserved.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (item, idx) => (
                <motion.a
                  key={item}
                  href="#"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ textDecoration: "underline" }}
                  className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200"
                >
                  {item}
                </motion.a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 40 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40 p-4 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white rounded-full shadow-2xl transition-all duration-300"
            whileHover={{
              scale: 1.15,
              boxShadow: "0 0 40px rgba(59, 130, 246, 0.8)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={
                reduceAnimations
                  ? { duration: 0 }
                  : { duration: 1.5, repeat: Infinity }
              }
              className="text-2xl"
            >
              <FaArrowUp />
            </motion.div>
            {!reduceAnimations && (
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-20 -z-10"
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating hearts - disabled on reduced motion */}
      {!reduceAnimations && (
        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{
                x: heartPosition.x,
                y: heartPosition.y,
                opacity: 1,
                scale: 1,
              }}
              animate={{
                x: heartPosition.x + (Math.random() - 0.5) * 200,
                y: heartPosition.y - 200,
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute pointer-events-none z-50"
            >
              <FaHeart className="text-red-500 text-2xl" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </footer>
  );
}
