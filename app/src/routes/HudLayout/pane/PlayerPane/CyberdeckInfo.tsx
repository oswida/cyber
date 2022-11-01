import { useAtom, useAtomValue } from "jotai";
import { PropsWithChildren, useEffect } from "react";
import {
  langHud,
  PcInfo,
  PcMod,
  stateNats,
  statePlayers,
  stateSessionData,
  topicChars,
  useNats,
} from "~/common";
import { useStorage } from "~/common/storage";
import { Button, InfoPanel, Text } from "~/component";

type Props = PropsWithChildren & {
  onClose?: () => void;
  itemId: string;
};

export const CyberdeckInfo = ({ onClose, itemId }: Props) => {
  const [players, setPlayers] = useAtom(statePlayers);

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
      {itemId && (
        <Text css={{ alignSelf: "center", margin: 10 }} color="blue">
          {players[itemId]?.name}
        </Text>
      )}

      <Button css={{ position: "absolute", bottom: 20, right: 20 }}>
        {" "}
        {langHud[sessionData.lang!!].save}
      </Button>
    </InfoPanel>
  );
};
