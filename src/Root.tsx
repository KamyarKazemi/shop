import { Outlet, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence, motion } from "motion/react";

// Lazy load header and footer components
const DesktopHeader = lazy(() => import("./components/DesktopHeader"));
const MobileHeader = lazy(() => import("./components/MobileHeader"));
const Footer = lazy(() => import("./components/Footer"));

// Loading fallbacks
const HeaderFallback = () => <div className="h-20 bg-gray-900 animate-pulse" />;
const FooterFallback = () => <div className="h-40 bg-gray-900 animate-pulse" />;

function Root() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<HeaderFallback />}>
        {isMobile ? <MobileHeader /> : <DesktopHeader />}
      </Suspense>

      {/* PAGE TRANSITION WRAPPER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className={`flex-1 ${isMobile ? "ml-0" : "ml-20"}`}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      <Suspense fallback={<FooterFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default Root;
