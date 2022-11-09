import { Trans } from "@lingui/macro";
import { useAtomValue } from "jotai";
import { PropsWithChildren } from "react";
import { PcInfo, stateSessionData } from "~/common";
import { Button, InfoPanel, Text } from "~/component";
import { InventoryForm } from "./InventoryForm";
import { usePlayerForm } from "./usePlayerForm";

type Props = PropsWithChildren & {
  onClose?: () => void;
  item: PcInfo | undefined;
};

export const InvInfo = ({ onClose, item }: Props) => {
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

      <InventoryForm
        responsive={true}
        itemState={itemState}
        setValue={setValue}
      />

      <Button
        css={{ marginTop: 20, maxWidth: "max-content", alignSelf: "center" }}
        onClick={save}
      >
        {" "}
        <Trans>Save</Trans>
      </Button>
    </InfoPanel>
  );
};
