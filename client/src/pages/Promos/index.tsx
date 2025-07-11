import { BrowserView, MobileView } from "react-device-detect";

import { DesktopPromos } from "./desktop";
import { MobilePromos } from "./mobile";

const Promos = () => {
  return (
    <>
      <BrowserView>
        <DesktopPromos />
      </BrowserView>
      <MobileView>
        <MobilePromos />
      </MobileView>
    </>
  );
};

export default Promos;
