import { BrowserView, MobileView } from "react-device-detect";

import { default as DesktopNotification } from "./desktop";
import { MobileNotification } from "./mobile";
import { getFirstParamURL } from "../../utils/logic";
import NotFound from "../NotFound";
import { ADMIN, GAME } from "../../constants";

const Notification = () => {
  const url = getFirstParamURL();
  return (
    <>
      <BrowserView>
        {url === ADMIN ? <DesktopNotification /> : <NotFound />}
      </BrowserView>
      <MobileView>
        {url === GAME ? <MobileNotification /> : <NotFound />}
      </MobileView>
    </>
  );
};

export default Notification;
