import { useAtomValue } from "jotai";
import { language } from "~/common";
import { Button, Flex } from "~/component";
import { HudPane } from "../../styles";
import { RollButton } from "./RollButton";
import { RollHistory } from "./RollHistory";
import { RollResult } from "./RollResult";
import { RollButtons } from "./styles";

export const RollerPane = () => {
  const lang = useAtomValue(language);

  return (
    <HudPane css={{ alignItems: "flex-start" }}>
      <Flex direction="column" css={{ gap: 10, width: "90%" }}>
        <RollResult />
        <RollButtons>
          <RollButton />
        </RollButtons>
        <RollHistory />
      </Flex>
    </HudPane>
  );
};
