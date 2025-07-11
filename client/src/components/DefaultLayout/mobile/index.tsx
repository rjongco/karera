import { Grid, styled } from "@mui/material";
import { ClientHeader } from "./ClientHeader";
import { ClientContent } from "./ClientContent";
import { ClientFooter } from "./ClientFooter";
import { Route, Routes } from "react-router-dom";
import { GAME_ROUTES, LINKS_NO_LAYOUT } from "../../../utils/routes";
import { GlobalContext } from "../../../context/GlobalProvider";
import { useContext } from "react";
import { MobileLandscape } from "../../MobileLandscape";

const MainContainer = styled(Grid)(() => ({
  position: "relative",
}));

const MainHeader = styled(Grid)(() => ({
  height: "8vh",
  position: "sticky",
  top: "0",
  background:
    "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
}));

const MainBody = styled(Grid)(() => ({}));

const MainFooter = styled(Grid)(() => ({
  height: "10vh",
  position: "sticky",
  bottom: "0",
  background:
    "linear-gradient(180deg, hsla(0, 100%, 56%, 1) 0%, hsla(0, 100%, 39%, 1) 100%)",
}));

const NoLayoutContainer = styled(Grid)(() => ({
  display: "none",
  "@media screen and (max-aspect-ratio: 13/9)": {
    height: "100%",
    width: "100%",
    display: "block",
  },
}));

export const MobileDefaultLayout = () => {
  //  @ts-ignore
  const { auth } = useContext(GlobalContext);

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
                    key={`DefaultLayout-${idx}`}
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
    <MainContainer
      container
      direction="column"
      alignItems="space-between"
      justifyContent="space-between"
    >
      <MainHeader item>
        <ClientHeader />
      </MainHeader>
      <MainBody item>
        <ClientContent />
      </MainBody>
      <MainFooter item>
        <ClientFooter />
      </MainFooter>
    </MainContainer>
  );
};
