import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import AppInitializer from "./components/AppInitializer";

ReactDOM.render(
  <AppInitializer>
    <App />
  </AppInitializer>,
  document.getElementById("root")
);
