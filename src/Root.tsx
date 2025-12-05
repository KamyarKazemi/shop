import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useMediaQuery } from "react-responsive";

// Lazy load header and footer components
const DesktopHeader = lazy(() => import("./components/DesktopHeader"));
const MobileHeader = lazy(() => import("./components/MobileHeader"));
const Footer = lazy(() => import("./components/Footer"));

// Loading fallbacks
const HeaderFallback = () => <div className="h-20 bg-gray-900 animate-pulse" />;
const FooterFallback = () => <div className="h-40 bg-gray-900 animate-pulse" />;

function Root() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br">
      <Suspense fallback={<HeaderFallback />}>
        {isMobile ? <MobileHeader /> : <DesktopHeader />}
      </Suspense>
      <div className={`flex-1 ${isMobile ? "ml-0" : "ml-20"}`}>
        <Outlet />
      </div>
      <Suspense fallback={<FooterFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default Root;
