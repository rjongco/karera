import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/en";

import GlobalProvider from "./context/GlobalProvider";

import { AUTH_ROUTES, PUBLIC_ROUTES, renderRoute } from "./utils/routes";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      ...PUBLIC_ROUTES.map((route: any) => renderRoute(route)),
      ...AUTH_ROUTES.map((route: any) => renderRoute(route)),
    ])
  );
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-us">
        <GlobalProvider>
          <RouterProvider router={router} />
        </GlobalProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
