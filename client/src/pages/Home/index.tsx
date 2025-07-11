import { BrowserView, MobileView } from "react-device-detect";

import { DesktopHome } from "./desktop";
import { MobileHome } from "./mobile";

const Home = () => {
  return (
    <>
      <BrowserView>
        <DesktopHome />
      </BrowserView>
      <MobileView>
        <MobileHome />
      </MobileView>
    </>
  );
};

export default Home;
