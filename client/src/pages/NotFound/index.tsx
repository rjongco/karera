import { BrowserView, MobileView } from "react-device-detect";

import { DesktopNotFound } from "./desktop";
import { MobileNotFound } from "./mobile";

const NotFound = () => {
  return (
    <>
      <BrowserView>
        <DesktopNotFound />
      </BrowserView>
      <MobileView>
        <MobileNotFound />
      </MobileView>
    </>
  );
};

export default NotFound;
