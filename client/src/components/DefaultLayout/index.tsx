import { BrowserView, MobileView } from "react-device-detect";

import { DesktopDefaultLayout } from "./desktop";
import { MobileDefaultLayout } from "./mobile";

const DefaultLayout = () => {
  return (
    <>
      <BrowserView>
        <DesktopDefaultLayout />
      </BrowserView>
      <MobileView>
        <MobileDefaultLayout />
      </MobileView>
    </>
  );
};

export default DefaultLayout;
