import { Outlet } from "react-router-dom";
import DesktopHeader from "./components/DesktopHeader";
import MobileHeader from "./components/MobileHeader";
import Footer from "./components/Footer";
import { useMediaQuery } from "react-responsive";

function Root() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="flex flex-col min-h-screen">
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
      <div className={`flex-1 ${isMobile ? "ml-0" : "ml-20"}`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Root;
