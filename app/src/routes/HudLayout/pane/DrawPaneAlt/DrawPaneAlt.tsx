import { useAtomValue } from "jotai";

import { stateSessionData, styled } from "~/common";
import { Whiteboard } from "~/component";
import { HudPane } from "../../styles";

export const DrawPaneAlt = () => {
  return (
    <HudPane css={{ padding: 0, width: "100%", height: "100%" }}>
      <Whiteboard />
    </HudPane>
  );
};
