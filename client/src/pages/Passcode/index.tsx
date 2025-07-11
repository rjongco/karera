import { BrowserView, MobileView } from "react-device-detect";

import { DesktopPasscode  } from "./desktop";
import { MobilePasscode } from "./mobile";
import { getFirstParamURL } from "../../utils/logic";
import { NotFound } from "..";
import { ADMIN, GAME } from "../../constants";

const Passcode = () => {
    const url = getFirstParamURL();
    return (
        <>
          <BrowserView>
            {url === ADMIN ? <DesktopPasscode /> : <NotFound />}
          </BrowserView>
          <MobileView>
            {url === GAME ? <MobilePasscode /> : <NotFound />}
          </MobileView>
        </>
    );
};

export default Passcode;
