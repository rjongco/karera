import { BrowserView, MobileView } from "react-device-detect";

import { DesktopClientLayout } from "./desktop";
import { MobileClientLayout } from "./mobile";

const ClientLayout = () => {
  return (
    <>
      <BrowserView>
        <DesktopClientLayout />
      </BrowserView>
      <MobileView>
        <MobileClientLayout />
      </MobileView>
    </>
  );
};

export default ClientLayout;
