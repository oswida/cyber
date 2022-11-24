import { Route, Routes } from "@solidjs/router";
import type { Component, ParentProps } from "solid-js";
import { appStyle } from "./app.css";
import {
  AppDataProvider,
  loadSessionData,
  themeClass,
  updateStoreSize,
  useAppData,
} from "./common";
import { GenView } from "./route/GenView";
import { HudView } from "./route/HudView";
import { Trans } from "./route/Trans";

const Main: Component<ParentProps> = ({ children }) => {
  const appData = useAppData();
  loadSessionData(appData);
  updateStoreSize(appData);

  return (
    <div class={themeClass}>
      <div class={appStyle}>{children}</div>
    </div>
  );
};

const App: Component = () => {
  return (
    <AppDataProvider>
      <Main>
        <Routes>
          <Route path="/" component={HudView} />
          <Route path="/gen" component={GenView} />
          <Route path="/trans" component={Trans} />
        </Routes>
      </Main>
    </AppDataProvider>
  );
};

export default App;
