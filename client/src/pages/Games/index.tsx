import { BrowserView, MobileView } from "react-device-detect";

import { DesktopGames } from "./desktop";
import { MobileGames } from "./mobile";

const Games = () => {
  return (
    <>
      <BrowserView>
        <DesktopGames />
      </BrowserView>
      <MobileView>
        <MobileGames />
      </MobileView>
    </>
  );
};

export default Games;
