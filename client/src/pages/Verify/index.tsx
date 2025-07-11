import { BrowserView, MobileView } from "react-device-detect";

import { DesktopVerify } from "./desktop";
import { MobileVerify } from "./mobile";

const Verify = () => {
  return (
    <>
      <BrowserView>
        <DesktopVerify />
      </BrowserView>
      <MobileView>
        <MobileVerify />
      </MobileView>
    </>
  );
};

export default Verify;
