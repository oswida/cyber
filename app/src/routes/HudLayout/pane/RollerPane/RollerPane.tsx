import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtomValue, useSetAtom } from "jotai";
import { language, stateRollHistory } from "~/common";
import { Button, Flex } from "~/component";
import { HudPane } from "../../styles";
import { RollButton } from "./RollButton";
import { RollHistory } from "./RollHistory";
import { RollResult } from "./RollResult";
import { RollButtons } from "./styles";

export const RollerPane = () => {
  const lang = useAtomValue(language);
  const setRolls = useSetAtom(stateRollHistory);

  const clearRolls = () => {
    setRolls({});
  };
  return (
    <HudPane>
      <RollResult />
      <RollButtons>
        <RollButton />
      </RollButtons>
      <FontAwesomeIcon
        icon={faEraser}
        style={{ alignSelf: "end", marginTop: -15, marginRight: 10 }}
        title="Clear roll history locally"
        onClick={clearRolls}
      />
      <RollHistory />
    </HudPane>
  );
};
