import { Route, Routes } from "react-router-dom";
import { PUBLIC_ROUTES } from "../../../../utils/routes";
import { GlobalContext } from "../../../../context/GlobalProvider";
import { useContext } from "react";
import Home from "../../../../pages/Home";

export const ClientContent = () => {
  //  @ts-ignore
  const { auth } = useContext(GlobalContext);

  return (
    <div style={{}}>
      <Routes>
        {PUBLIC_ROUTES.filter((route: any) => {
          const childRoute = route?.children;
          return !childRoute?.role?.includes(auth?.role);
        }).map((route: any, idx: any) => {
          if (route?.children) {
            return route?.children.map((routeChild: any, idxChild: any) => {
              const routeChildren = routeChild;

              return (
                //  @ts-ignore
                routeChildren.element && (
                  <>
                    <Route
                      key={`ClientContent-${idx}-${idxChild}`}
                      path={routeChildren.path}
                      element={
                        Boolean(routeChildren.context) ? (
                          <routeChildren.context>
                            <routeChildren.element />
                          </routeChildren.context>
                        ) : (
                          <routeChildren.element />
                        )
                      }
                    />
                  </>
                )
              );
            });
          }
          if (route.path === "/") {
            return <Route key={`${idx}-home`} path={"/"} element={<Home />} />;
          } else {
            return (
              <Route
                path={route.path}
                element={route.component}
                key={route.path}
              />
            );
          }
        })}
      </Routes>
    </div>
  );
};
