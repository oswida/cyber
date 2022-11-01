import { useAtom, useAtomValue } from "jotai";
import { PropsWithChildren } from "react";
import {
  langHud,
  PcInfo,
  stateNats,
  statePlayers,
  stateSessionData,
  useNats,
} from "~/common";
import { useStorage } from "~/common/storage";
import { Button, InfoPanel, Text } from "~/component";
import { ModForm } from "./ModForm";
import { usePlayerForm } from "./usePlayerForm";

type Props = PropsWithChildren & {
  onClose?: () => void;
  item: PcInfo | undefined;
};

export const CyberdeckInfo = ({ onClose, item }: Props) => {
  const [players, setPlayers] = useAtom(statePlayers);
  const { itemState, setValue, psyWatch, triggerPsyWatch } =
    usePlayerForm(item);

  const { savePlayers } = useStorage();
  const { publish } = useNats();
  const nats = useAtomValue(stateNats);
  const sessionData = useAtomValue(stateSessionData);

  const onSubmit = (data: PcInfo) => {
    // if (itemId === "") return;
    // const newState = { ...players };
    // const item = newState[itemId];
    // if (!item) return;
    // item.cyberdeck = getValues();
    // setPlayers(newState);
    // savePlayers(newState);
    // if (data.shared) {
    //   publish(nats.connection, topicChars, [data]);
    // }
  };

  return (
    <InfoPanel onClose={onClose}>
      {itemState && (
        <Text css={{ alignSelf: "center", margin: 10 }} color="blue">
          {itemState.name}
        </Text>
      )}
      <ModForm
        responsive={true}
        itemState={itemState}
        itemType="cyberdeck"
        setValue={setValue}
        triggerPsyWatch={triggerPsyWatch}
      />
      <Button css={{ position: "absolute", bottom: 20, right: 20 }}>
        {" "}
        {langHud[sessionData.lang!!].save}
      </Button>
    </InfoPanel>
  );
};
