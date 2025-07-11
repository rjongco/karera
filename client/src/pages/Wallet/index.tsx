import { BrowserView, MobileView } from "react-device-detect";

import { DesktopWallet } from "./desktop";
import { MobileWallet } from "./mobile";

const Wallet = () => {
  return (
    <>
      <BrowserView>
        <DesktopWallet />
      </BrowserView>
      <MobileView>
        <MobileWallet />
      </MobileView>
    </>
  );
};

export default Wallet;
