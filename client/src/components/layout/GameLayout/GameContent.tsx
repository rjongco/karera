import { Route, Routes } from "react-router-dom";
import { GAME_ROUTES } from "../../../utils/routes";

export const GameContent = () => {
  return (
    <>
      {GAME_ROUTES.map((route, idx) => {
        return (
          //  @ts-ignore
          route.element && (
            <Routes key={`route-game-${idx}`}>
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
    </>
  );
};
