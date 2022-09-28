import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter basename="/E-shop">
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
  rootElement
);
