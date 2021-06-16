import React, { FC } from "react";
import { useLazyLoading } from "../hooks";
import Federated from "./Federated";

const App: FC = () => {

   return (
    <div>
      <h1>Dynamic Host</h1>
      <h2>App 1</h2>

        <div style={{ marginTop: "2em" }}>
          <Federated module="app2/Widget"/>
          <Federated module="app3/Widget" />
        </div>

    </div>
  );
};

export default App;
