import { BrowserView, MobileView } from "react-device-detect";

import { DesktopRegister } from "./desktop";
import { MobileRegister } from "./mobile";

const Register = () => {
  return (
    <>
      <BrowserView>
        <DesktopRegister />
      </BrowserView>
      <MobileView>
        <MobileRegister />
      </MobileView>
    </>
  );
};

export default Register;
