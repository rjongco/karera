import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { theme } from "./utils";
import { ThemeProvider } from "@mui/material/styles";

// Only enable the StrictMode when debugging, as it calls rendering twice, causing bugs in websocket
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  //   <ThemeProvider theme={theme}>
  //     <App />
  //   </ThemeProvider>
  // </React.StrictMode>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

