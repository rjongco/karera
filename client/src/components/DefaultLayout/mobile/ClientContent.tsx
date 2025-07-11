import { Route, Routes } from "react-router-dom";
import { GlobalContext } from "../../../context/GlobalProvider";
import { useContext } from "react";
import { PRIVATE_ROUTES } from "../../../utils/routes";

export const ClientContent = () => {
  //  @ts-ignore
  const { auth } = useContext(GlobalContext);

  return (
    <div style={{ height: "82vh" }}>
      <Routes>
        {PRIVATE_ROUTES.filter((route) => {
          return route?.role?.includes(auth?.role);
        }).map((route, idx) => {
          return (
            //  @ts-ignore
            route.element && (
              <>
                <Route
                  key={idx}
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
              </>
            )
          );
        })}
      </Routes>
    </div>
  );
};
