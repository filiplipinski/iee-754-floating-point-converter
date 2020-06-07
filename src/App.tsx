import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { default as bemCssModules } from "bem-css-modules";
import { Content } from "./components/Content/Content";
import { Header } from "./components/Header/Header";
import Converter from "./components/Converter";
import FpConverter from "./components/FpConverter";
import { store } from "./stores/store";

import "./App.css";

bemCssModules.setSettings({
  modifierDelimiter: "--",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  throwOnError: true,
});

export const App: React.FC = () => {
  const [integersOrReal, setIntegersOrReal] = useState<"real" | "integers">("real");
  return (
    <Provider store={store}>
      <div className="app">
        <BrowserRouter>
          {/* <Header />
          <Content /> */}
          <div className="btnsBox">
            <button className="chooseType" onClick={() => setIntegersOrReal("real")}>
              Real number
            </button>
            <button className="chooseType" onClick={() => setIntegersOrReal("integers")}>
              Integers number
            </button>
          </div>
          {integersOrReal === "integers" && <Converter />}
          {integersOrReal === "real" && <FpConverter />}

          <footer>Author: Filip Lipiński</footer>
        </BrowserRouter>
      </div>
    </Provider>
  );
};
