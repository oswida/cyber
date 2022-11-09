import { Trans } from "@lingui/macro";
import { useAtomValue } from "jotai";
import { PropsWithChildren } from "react";
import { PcInfo, stateSessionData } from "~/common";
import { Button, InfoPanel, Text } from "~/component";
import { ModForm } from "./ModForm";
import { usePlayerForm } from "./usePlayerForm";

type Props = PropsWithChildren & {
  onClose?: () => void;
  item: PcInfo | undefined;
  itemType: "cybermods" | "cyberdeck";
};

export const ModInfo = ({ onClose, item, itemType }: Props) => {
  const { itemState, setValue, saveItem, setValues } = usePlayerForm(item);

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
      <ModForm
        responsive={true}
        itemState={itemState}
        itemType={itemType}
        setValue={setValue}
        setValues={setValues}
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
