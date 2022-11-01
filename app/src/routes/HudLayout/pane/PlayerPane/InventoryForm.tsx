import {
  faArrowDown,
  faArrowUp,
  faLock,
  faLockOpen,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtomValue } from "jotai";
import { useState } from "react";

import {
  langHud,
  PcInfo,
  PcSlot,
  stateSessionData,
  themeColors,
} from "~/common";
import { Button, Flex, Text } from "~/component";
import { PFInput, SelectableItem } from "./styles";
import { SubformProps } from "./usePlayerForm";

export const InventoryForm = ({ itemState, setValue }: SubformProps) => {
  const [selInv, setSelInv] = useState(-1);
  const [folded, setFolded] = useState(false);
  const sessionData = useAtomValue(stateSessionData);

  const toggleFatigue = (index: number) => {
    if (!itemState || itemState.inventory.length <= index) return;
    const newState = [...itemState.inventory];
    newState[index].fatigue = !itemState.inventory[index].fatigue;
    setValue("inventory", newState);
  };

  const delInventory = () => {
    if (!itemState || itemState.inventory.length <= selInv || selInv < 0)
      return;
    const newState = [...itemState.inventory];
    newState.splice(selInv, 1);
    setValue("inventory", newState);
  };

  const addInventory = () => {
    if (!itemState) return;
    const entry: PcSlot = {
      description: "item",
      fatigue: false,
    };
    if (itemState.inventory) {
      setValue("inventory", [...itemState.inventory, entry]);
    } else {
      setValue("inventory", [entry]);
    }
    setFolded(false);
  };

  const updateItem = (v: any, index: number) => {
    if (!itemState) return;
    const value = v.target.value;
    const newState = [...itemState.inventory];
    newState[index].description = value;
    setValue("inventory", newState);
  };

  return (
    <Flex direction="column">
      <Flex center css={{ gap: 20 }}>
        {itemState?.inventory && itemState?.inventory.length > 0 && (
          <Button border="underline" onClick={() => setFolded(!folded)}>
            <FontAwesomeIcon icon={folded ? faArrowDown : faArrowUp} />
          </Button>
        )}
        <Text color="yellow" size="small">
          {langHud[sessionData.lang!!].inventory} (
          {itemState?.inventory ? itemState?.inventory.length : "0"})
        </Text>
        <Button border="underline" onClick={addInventory}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Button border="underline" onClick={delInventory}>
          <FontAwesomeIcon icon={faMinus} />
        </Button>
      </Flex>
      {itemState?.inventory &&
        !folded &&
        itemState?.inventory.map((it, index) => (
          <SelectableItem
            key={`inv-${index}`}
            selected={selInv === index}
            onClick={() => setSelInv(index)}
          >
            <PFInput
              small
              border="down"
              defaultValue={it?.description}
              disabled={it?.fatigue}
              css={{
                width: 700,
              }}
              onChange={(e: any) => updateItem(e, index)}
            />
            <FontAwesomeIcon
              style={{
                alignSelf: "center",
                color: it?.fatigue ? themeColors.pink : themeColors.green,
              }}
              title={langHud[sessionData.lang!!].fatigue}
              icon={it?.fatigue ? faLock : faLockOpen}
              onClick={() => toggleFatigue(index)}
            />
          </SelectableItem>
        ))}
    </Flex>
  );
};
