import { Outlet } from "react-router-dom";
import DesktopHeader from "./components/DesktopHeader";
import MobileHeader from "./components/MobileHeader";
import { useMediaQuery } from "react-responsive";

function Root() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
      <div className={`${isMobile ? "ml-0" : "ml-22"}`}>
        <Outlet />
      </div>
    </>
  );
}

export default Root;
