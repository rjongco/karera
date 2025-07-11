import { BrowserView, MobileView } from "react-device-detect";

import { DesktopKYC } from "./desktop";
import { MobileKYC } from "./mobile";

const KYC = () => {
  return (
    <>
      <BrowserView>
        <DesktopKYC />
      </BrowserView>
      <MobileView>
        <MobileKYC />
      </MobileView>
    </>
  );
};

export default KYC;
