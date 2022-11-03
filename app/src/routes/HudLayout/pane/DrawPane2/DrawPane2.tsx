import { Tldraw, TldrawApp } from "@tldraw/tldraw";
import { useCallback, useRef } from "react";
import { Flex } from "~/component";
import { HudPane } from "../../styles";

export const DrawPane2 = () => {
  const rTldrawApp = useRef<TldrawApp>();

  const handleMount = useCallback((app: TldrawApp) => {
    rTldrawApp.current = app;
  }, []);

  return (
    <div className="tldraw">
      <Tldraw
        darkMode={true}
        showMultiplayerMenu={false}
        disableAssets={true}
        showPages={false}
        showMenu={false}
        showTools={true}
      />
    </div>
  );
};
