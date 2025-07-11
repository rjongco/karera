import { useContext, useRef, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import { GlobalContext } from "../context/GlobalProvider";
// @ts-ignore
import { AppHeader, AppSidebar, AppContent } from "./layout";
import { useSize } from "../utils/logic";
interface IDefaultLayoutProps {}

const DefaultLayout2: React.FC<IDefaultLayoutProps> = () => {
  // @ts-ignore
  const { openSideBar, setOpenSideBar } = useContext(GlobalContext);

  const target = useRef(null);
  const size = useSize(target);

  useEffect(() => {
    // @ts-ignore
    if (size && size.width && size.width != 0) {
      // @ts-ignore
      if (size.width > 900) {
        setOpenSideBar(true);
      } else {
        setOpenSideBar(false);
      }
    }
  }, [size]);

  return (
    <Box sx={{ display: "flex" }} ref={target}>
      <CssBaseline />
      {/* @ts-ignore */}
      <AppHeader open={openSideBar} />
      <AppSidebar open={openSideBar} />
      <AppContent />
    </Box>
  );
};

export default DefaultLayout2;
