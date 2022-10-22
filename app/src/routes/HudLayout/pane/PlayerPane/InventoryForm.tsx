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
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import {
  langHud,
  PcInfo,
  PcSlot,
  stateSessionData,
  themeColors,
} from "~/common";
import { Button, Flex, Text } from "~/component";
import { PFInput, SelectableItem } from "./styles";

type Props = {
  inventory: PcSlot[];
  getValues: UseFormGetValues<PcInfo>;
  setValue: UseFormSetValue<PcInfo>;
  register: UseFormRegister<PcInfo>;
};

export const InventoryForm = ({
  inventory,
  getValues,
  setValue,
  register,
}: Props) => {
  const [selInv, setSelInv] = useState(-1);
  const [folded, setFolded] = useState(false);
  const sessionData = useAtomValue(stateSessionData);

  const toggleFatigue = (index: number) => {
    if (inventory.length <= index) return;
    const newState = [...inventory];
    newState[index].fatigue = !inventory[index].fatigue;
    setValue("inventory", newState);
  };

  const delInventory = () => {
    if (inventory.length <= selInv || selInv < 0) return;
    const newState = [...inventory];
    newState.splice(selInv, 1);
    setValue("inventory", newState);
  };

  const addInventory = () => {
    const entry: PcSlot = {
      description: "item",
      fatigue: false,
    };
    const info = getValues();
    if (info.inventory) {
      setValue("inventory", [...info.inventory, entry]);
    } else {
      setValue("inventory", [entry]);
    }
    setFolded(false);
  };

  return (
    <Flex direction="column">
      <Flex center css={{ gap: 20 }}>
        {inventory && inventory.length > 0 && (
          <Button border="underline" onClick={() => setFolded(!folded)}>
            <FontAwesomeIcon icon={folded ? faArrowDown : faArrowUp} />
          </Button>
        )}
        <Text color="yellow" size="small">
          {langHud[sessionData.lang!!].inventory} (
          {inventory ? inventory.length : "0"})
        </Text>
        <Button border="underline" onClick={addInventory}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Button border="underline" onClick={delInventory}>
          <FontAwesomeIcon icon={faMinus} />
        </Button>
      </Flex>
      {inventory &&
        !folded &&
        inventory.map((it, index) => (
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
              {...register(`inventory.${index}.description`)}
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
