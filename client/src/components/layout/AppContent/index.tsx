import { useContext } from "react";

import React from "react";
import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import { Routes, Route } from "react-router-dom";
import { PRIVATE_ROUTES } from "../../../utils/routes";
//  @ts-ignore
import { AppFooter } from "../../layout";
import { GlobalContext } from "../../../context/GlobalProvider";

interface IAppContentProps {}

//  @ts-ignore
const AppContent: React.FC<IAppContentProps> = () => {
  //  @ts-ignore
  const { auth } = useContext(GlobalContext);

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "#ffffff",
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container
        //  @ts-ignore
        maxWidth="xxl"
        xs={12}
        sx={{
          margin: "0 !important",
          padding: "0 !important",
          minHeight: "90vh",
        }}
      >
        {PRIVATE_ROUTES.filter((route) => {
          return route?.role?.includes(auth?.role);
        }).map((route, idx) => {
          return (
            //  @ts-ignore
            route.element && (
              <Routes key={`appContent-${idx}`}>
                <Route
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
              </Routes>
            )
          );
        })}
      </Container>
      <AppFooter />
    </Box>
  );
};

export default AppContent;
