import { BrowserView, MobileView } from "react-device-detect";

import { DesktopLoading } from "./desktop";
import { MobileLoading } from "./mobile";

const LoadingInfo = () => {
  return (
    <>
      <BrowserView>
        <DesktopLoading />
      </BrowserView>
      <MobileView>
        <MobileLoading />
      </MobileView>
    </>
  );
};

export default LoadingInfo;
