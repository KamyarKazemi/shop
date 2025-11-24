import { motion, AnimatePresence } from "motion/react";
import { FaCheck, FaExclamation } from "react-icons/fa";

export default function Toast({ notification, setNotification }) {
  if (!notification) return null;

  const isSuccess = notification.type === "success";

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: 400 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 400 }}
          transition={{ type: "spring", damping: 20 }}
          role="status"
          aria-live="polite"
          className={`fixed right-6 bottom-24 sm:bottom-6 z-50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border ${
            isSuccess
              ? "bg-gradient-to-r from-green-500/95 to-emerald-600/95 border-green-400"
              : "bg-gradient-to-r from-red-500/95 to-rose-600/95 border-red-400"
          }`}
        >
          <div className="flex items-center gap-4 p-4 max-w-md">
            {/* Icon */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              className={`flex-shrink-0 text-2xl ${
                isSuccess ? "text-white" : "text-white"
              }`}
            >
              {isSuccess ? <FaCheck /> : <FaExclamation />}
            </motion.div>

            {/* Content */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="font-bold text-white text-sm sm:text-base"
              >
                {notification.text}
              </motion.div>
              {notification.product ? (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-xs sm:text-sm opacity-90 mt-1 text-white/95"
                >
                  <span className="font-semibold">
                    {notification.product.title}
                  </span>
                  {notification.product.price !== undefined && (
                    <span className="ml-2 opacity-75">
                      — ${String(notification.product.price)}
                    </span>
                  )}
                </motion.div>
              ) : null}
            </div>

            {/* Cart count badge */}
            {typeof notification.count === "number" && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex flex-col items-center justify-center px-3 py-2 bg-white/25 rounded-lg backdrop-blur-sm border border-white/30"
              >
                <div className="text-xs font-semibold text-white">Cart</div>
                <motion.div
                  key={notification.count}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.4 }}
                  className="font-bold text-xl text-white"
                >
                  {notification.count}
                </motion.div>
              </motion.div>
            )}

            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setNotification(null)}
              aria-label="Close notification"
              className="flex-shrink-0 font-bold px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all duration-200 text-sm"
            >
              ✕
            </motion.button>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 3, ease: "linear" }}
            style={{ originX: 0 }}
            className={`h-1 ${
              isSuccess
                ? "bg-gradient-to-r from-green-300 to-emerald-300"
                : "bg-gradient-to-r from-red-300 to-rose-300"
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
