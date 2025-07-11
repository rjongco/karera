import { BrowserView, MobileView } from "react-device-detect";

import { DesktopUserProfile } from "./desktop";
import { MobileUserProfile } from "./mobile";
import { getFirstParamURL } from "../../utils/logic";
import { ADMIN, GAME } from "../../constants";
import NotFound from "../NotFound";

const UserProfile = () => {
  const url = getFirstParamURL();
  return (
    <>
      <BrowserView>
        {url === ADMIN ? <DesktopUserProfile /> : <NotFound />}
      </BrowserView>
      <MobileView>
        {url === GAME ? <MobileUserProfile /> : <NotFound />}
      </MobileView>
    </>
  );
};

export default UserProfile;
