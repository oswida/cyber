import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { language, stateRollHistory } from "~/common";
import { Flex } from "~/component";
import { HudPane } from "../../styles";
import { RollButton } from "./RollButton";
import { RollResult } from "./RollResult";
import { RollButtons, RollHistory } from "./styles";

export const RollerPane = () => {
  const lang = useAtomValue(language);
  const [rollHistory] = useAtom(stateRollHistory);

  useEffect(() => {
    const sc = document.getElementById("roll-history");
    if (!sc) return;
    console.log("scrolling");

    sc.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [rollHistory]);

  return (
    <HudPane>
      <Flex direction="column" css={{ gap: 10 }}>
        <RollResult />
        <RollButtons>
          <RollButton />
        </RollButtons>
        <RollHistory id="roll-history">
          {rollHistory.map((h) => (
            <div key={h.data}>{h.data}</div>
          ))}
        </RollHistory>
      </Flex>
    </HudPane>
  );
};
