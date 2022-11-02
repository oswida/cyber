import { useAtomValue } from "jotai";
import { PropsWithChildren } from "react";
import { langHud, PcInfo, stateSessionData } from "~/common";
import { Button, Flex, InfoPanel, Text } from "~/component";
import { InventoryForm } from "./InventoryForm";
import { StatForm } from "./StatForm";
import { usePlayerForm } from "./usePlayerForm";

type Props = PropsWithChildren & {
  onClose?: () => void;
  item: PcInfo | undefined;
};

export const StatInfo = ({ onClose, item }: Props) => {
  const { itemState, setValue, saveItem } = usePlayerForm(item);
  const sessionData = useAtomValue(stateSessionData);

  const save = () => {
    saveItem();
    if (onClose) onClose();
  };

  return (
    <InfoPanel onClose={onClose}>
      {itemState && (
        <Text
          css={{ alignSelf: "center", margin: 10, marginBottom: 20 }}
          color="blue"
        >
          {itemState.name}
        </Text>
      )}
      <Flex css={{ flex: 1, justifyContent: "center" }}>
        <StatForm responsive={true} itemState={itemState} setValue={setValue} />
      </Flex>
      <Button
        css={{ marginTop: 20, maxWidth: "max-content", alignSelf: "center" }}
        onClick={save}
      >
        {" "}
        {langHud[sessionData.lang!!].save}
      </Button>
    </InfoPanel>
  );
};
