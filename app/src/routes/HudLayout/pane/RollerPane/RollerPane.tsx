import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtomValue, useSetAtom } from "jotai";
import { language, stateRollHistory } from "~/common";
import { useStorage } from "~/common/storage";
import { Button, Flex } from "~/component";
import { HudPane } from "../../styles";
import { RollButton } from "./RollButton";
import { RollHistory } from "./RollHistory";
import { RollResult } from "./RollResult";
import { RollButtons } from "./styles";

export const RollerPane = () => {
  const lang = useAtomValue(language);
  const setRolls = useSetAtom(stateRollHistory);
  const { saveRolls } = useStorage();

  const clearRolls = () => {
    setRolls({});
    saveRolls({});
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
