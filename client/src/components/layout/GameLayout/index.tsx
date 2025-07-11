import { Grid } from "@mui/material";
import { GlobalContext } from "../../../context/GlobalProvider";
import { useContext, useState } from "react";
import { styled } from "@mui/system";
import { GameHeader } from "./GameHeader";
import { GameContent } from "./GameContent";
import { ClientSidebar } from "../ClientLayout/mobile/ClientSidebar";
import { GAME_ROUTES, LINKS_NO_LAYOUT } from "../../../utils/routes";
import { Route, Routes } from "react-router-dom";
import { MobileLandscape } from "../../MobileLandscape";

const MainContainer = styled(Grid)(() => ({
  display: "none",
  "@media screen and (max-aspect-ratio: 13/9)": {
    height: "100%",
    width: "100%",
    display: "block",
  },
  position: "relative",
  minHeight: "91vh",
  //   background: "linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9))",
  zIndex: 10,
}));

const MainHeader = styled(Grid)(() => ({
  height: "60px",
  position: "absolute",
  width: "100%",
  top: "0",
  zIndex: 300,
  background:
    "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
}));

const MainBody = styled(Grid)(() => ({
  overflowY: "scroll",
}));

const MainSidebar = styled(Grid)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
}));

const NoLayoutContainer = styled(Grid)(() => ({
  display: "none",
  "@media screen and (max-aspect-ratio: 13/9)": {
    height: "100%",
    width: "100%",
    display: "block",
  },
}));

// const MainRightSidebar = styled(Grid)(() => ({}));

// const MainFooter = styled(Grid)(() => ({
//   height: "70px",
//   position: "fixed",
//   bottom: "0",
//   background:
//     "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
//   width: "100%",
//   zIndex: 999,
// }));

const GameLayout = () => {
  const {
    //  @ts-ignore
    openGameSideBar,
    //  @ts-ignore
    setOpenGameSideBar,
    //  @ts-ignore
    auth: authInfo,
    //  @ts-ignore
  } = useContext(GlobalContext);
  const [openToggleSideBar, setOpenToggleSideBar] = useState(false);

  const handleCloseSidebar = () => {
    setOpenToggleSideBar(false);
  };

  const handleOpenSideBar = () => {
    setOpenToggleSideBar(true);
  };

  const handleCloseGameSideBar = () => {
    setOpenGameSideBar({ openGameSideBar: false });
  };

  if (LINKS_NO_LAYOUT.includes(window.location.pathname)) {
    return (
      <>
        <NoLayoutContainer>
          <Routes>
            {GAME_ROUTES.map((route, idx) => {
              return (
                //  @ts-ignore
                route.element && (
                  <Route
                    key={`GameLayout-${idx}`}
                    path={route.path}
                    element={
                      route.context ? (
                        <route.context>
                          <route.element />
                        </route.context>
                      ) : (
                        <route.element />
                      )
                    }
                  />
                )
              );
            })}
          </Routes>
        </NoLayoutContainer>
        <MobileLandscape />
      </>
    );
  }
  return (
    <>
      <MainContainer
        container
        direction="column"
        alignItems="space-between"
        justifyContent="space-between"
      >
        <MainHeader item>
          <GameHeader authInfo={authInfo} onOpenSideBar={handleOpenSideBar} />
        </MainHeader>
        <MainSidebar item>
          <ClientSidebar
            authInfo={authInfo}
            openGameSideBar={openGameSideBar}
            onOpenGameSideBar={handleCloseGameSideBar}
            toggleDrawer={openToggleSideBar}
            onToggleSideBar={handleCloseSidebar}
          />
        </MainSidebar>
        <MainBody item>
          <GameContent />
        </MainBody>
      </MainContainer>
      <MobileLandscape />
    </>
  );
};

export default GameLayout;
