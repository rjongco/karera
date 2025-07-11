import { BrowserView, MobileView } from "react-device-detect";

import { DesktopTransactions } from "./desktop";
import { MobileTransactions } from "./mobile";
import { getFirstParamURL } from "../../utils/logic";
import { ADMIN, GAME } from "../../constants";
import NotFound from "../NotFound";

const Transactions = () => {
  const url = getFirstParamURL();
  return (
    <>
      <BrowserView>
        {url === ADMIN ? <DesktopTransactions /> : <NotFound />}
      </BrowserView>
      <MobileView>
        {url === GAME ? <MobileTransactions /> : <NotFound />}
      </MobileView>
    </>
  );
};

export default Transactions;
