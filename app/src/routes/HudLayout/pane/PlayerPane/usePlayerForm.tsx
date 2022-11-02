import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { PcInfo, stateNats, statePlayers, topicChars, useNats } from "~/common";
import { useStorage } from "~/common/storage";

export type PcInfoKeys = keyof PcInfo;
export type SubformProps = {
  itemState: PcInfo | undefined;
  setValue: (arg: keyof PcInfo, value: any) => void;
  responsive?: boolean;
};

export const usePlayerForm = (item?: PcInfo) => {
  const [itemState, setItemState] = useState<PcInfo | undefined>(item);
  const [players, setPlayers] = useAtom(statePlayers);
  const { savePlayers } = useStorage();
  const { publish } = useNats();
  const nats = useAtomValue(stateNats);

  const setValue = (arg: PcInfoKeys, value: any) => {
    if (!itemState) return;
    const newState = { ...itemState };
    (newState[arg] as any) = value;
    setItemState(newState);
  };

  const setValues = (items: [keyof PcInfo, any][]) => {
    if (!itemState) return;
    const newState = { ...itemState };
    items.forEach((it) => {
      const key = it[0];
      (newState[key] as any) = it[1];
    });
    setItemState(newState);
  };

  const saveItem = () => {
    if (!itemState) return;
    const newState = { ...players };
    newState[itemState.id] = itemState;
    setPlayers(newState);
    savePlayers(newState);
    if (itemState.shared) {
      publish(nats.connection, topicChars, [itemState]);
    }
  };

  return {
    itemState,
    setValue,
    saveItem,
    setValues,
  };
};
