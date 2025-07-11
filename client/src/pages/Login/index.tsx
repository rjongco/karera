import { BrowserView, MobileView } from "react-device-detect";

import { DesktopLogin } from "./desktop";
import { MobileLogin } from "./mobile";

const Register = () => {
  return (
    <>
      <BrowserView>
        <DesktopLogin />
      </BrowserView>
      <MobileView>
        <MobileLogin />
      </MobileView>
    </>
  );
};

export default Register;
