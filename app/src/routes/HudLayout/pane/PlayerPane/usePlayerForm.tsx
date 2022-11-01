import { useState } from "react";
import { PcInfo } from "~/common";

export type PcInfoKeys = keyof PcInfo;
export type SubformProps = {
  itemState: PcInfo | undefined;
  setValue: (arg: keyof PcInfo, value: any) => void;
  responsive?: boolean;
};

export const usePlayerForm = (item?: PcInfo) => {
  const [itemState, setItemState] = useState<PcInfo | undefined>(item);
  const [psyWatch, triggerPsyWatch] = useState<number[] | undefined>(item?.psy);

  const setValue = (arg: PcInfoKeys, value: any) => {
    if (!itemState) return;
    const newState = { ...itemState };
    (newState[arg] as any) = value;
    setItemState(newState);
  };

  return {
    itemState,
    setValue,
    psyWatch,
    triggerPsyWatch,
  };
};
