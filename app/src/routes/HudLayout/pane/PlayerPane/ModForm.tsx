import {
  faArrowDown,
  faArrowUp,
  faBoltLightning,
  faGears,
  faMinus,
  faPlay,
  faPlus,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtomValue } from "jotai";
import { useMemo, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { langHud, PcMod, stateSessionData, themeColors } from "~/common";
import { Button, Flex, Text } from "~/component";
import { PFInput, SelectableItem } from "./styles";
import { SubformProps } from "./usePlayerForm";

type Props = SubformProps & {
  itemType: "cybermods" | "cyberdeck";
  triggerPsyWatch: React.Dispatch<React.SetStateAction<number[] | undefined>>;
};

export const ModForm = ({
  itemState,
  setValue,
  itemType,
  triggerPsyWatch,
  responsive,
}: Props) => {
  const [selInv, setSelInv] = useState(-1);
  const [folded, setFolded] = useState(false);
  const sessionData = useAtomValue(stateSessionData);

  const itemName = useMemo(() => {
    return itemType === "cybermods" ? "cybermod" : "program";
  }, [itemType]);

  const addMod = () => {
    if (!itemState) return;
    const entry: PcMod = {
      id: uuidv4(),
      name: itemName,
      activated: false,
      need_activation: itemType === "cyberdeck" ? true : false,
      description: "",
    };
    if (itemState[itemType]) {
      setValue(itemType, [...itemState[itemType], entry]);
    } else {
      setValue(itemType, [entry]);
    }
    setFolded(false);
  };

  const delMod = () => {
    if (!itemState || itemState[itemType].length <= selInv || selInv < 0)
      return;
    const newState = [...itemState[itemType]];
    newState.splice(selInv, 1);
    setValue(itemType, newState);
  };

  const activationHint = (it: PcMod) => {
    return it.need_activation
      ? "Needs to be activated. Click to switch."
      : "Works without activation. Click to switch.";
  };

  const activateHint = (it: PcMod) => {
    return it.activated
      ? `${itemName} activated. Click after action to switch off.`
      : `${itemName} inactive. Click to activate.`;
  };

  const handleNeedsActivation = (it: PcMod) => {
    if (!itemState) return;
    const newState = [...itemState[itemType]];
    newState.forEach((cb) => {
      if (cb.id === it.id) {
        cb.need_activation = !cb.need_activation;
      }
    });
    setValue(itemType, newState);
  };

  const handleActivate = (it: PcMod) => {
    if (!itemState) return;
    let freeSlots = itemState.inventory.filter((it) => !it.fatigue).length;
    if (!it.activated) {
      if (freeSlots === 0) {
        alert(`Cannot activate ${itemName}! Character has full fatigue`);
        return;
      }
      const newState = [...itemState.inventory];
      for (let i = 0; i < newState.length; i++) {
        if (!newState[i].fatigue) {
          newState[i].fatigue = true;
          freeSlots--;
          break;
        }
      }
      setValue("inventory", newState);
      if (freeSlots === 0) {
        alert(
          "Last inventory slot fatigued! Character suffers PSY damage from cybernetic overuse."
        );
        const newPsy = [...itemState.psy];
        if (newPsy[0] > 0) newPsy[0] = newPsy[0] - 1;
        triggerPsyWatch(newPsy);
      }
    }
    const newState = [...itemState[itemType]];
    newState.forEach((cb) => {
      if (cb.id === it.id) {
        cb.activated = !cb.activated;
      }
    });
    setValue(itemType, newState);
  };

  const updateName = (e: any, index: number) => {
    if (!itemState) return;
    const value = e.target.value;
    const newState = [...itemState[itemType]];
    newState[index].name = value;
    setValue(itemType, newState);
  };

  const updateDesc = (e: any, index: number) => {
    if (!itemState) return;
    const value = e.target.value;
    const newState = [...itemState[itemType]];
    newState[index].description = value;
    setValue(itemType, newState);
  };

  return (
    <Flex direction="column">
      <Flex center css={{ gap: 20 }}>
        {itemState &&
          itemState[itemType] &&
          itemState[itemType].length > 0 &&
          !responsive && (
            <Button border="underline" onClick={() => setFolded(!folded)}>
              <FontAwesomeIcon icon={folded ? faArrowDown : faArrowUp} />
            </Button>
          )}
        <Text color="yellow" size="small">
          {langHud[sessionData.lang!!][itemType]} (
          {itemState && itemState[itemType] ? itemState[itemType].length : "0"}{" "}
          )
        </Text>
        <Button border="underline" onClick={addMod}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Button border="underline" onClick={delMod}>
          <FontAwesomeIcon icon={faMinus} />
        </Button>
      </Flex>
      {itemState &&
        itemState[itemType] &&
        !folded &&
        itemState[itemType].map((it, index) => (
          <SelectableItem
            key={`${itemName}-${index}`}
            selected={selInv === index}
            onClick={() => setSelInv(index)}
          >
            <Flex direction={responsive ? "column" : undefined}>
              <Flex>
                <PFInput
                  small
                  border="down"
                  defaultValue={it?.name}
                  css={{
                    width: responsive ? 350 : 250,
                  }}
                  onChange={(e: any) => updateName(e, index)}
                />
                <FontAwesomeIcon
                  style={{
                    alignSelf: "center",
                    color: it?.need_activation
                      ? themeColors.pink
                      : themeColors.green,
                  }}
                  icon={it.need_activation ? faGears : faRotate}
                  title={activationHint(it)}
                  onClick={() => handleNeedsActivation(it)}
                />
              </Flex>
              <Flex>
                <PFInput
                  small
                  border="down"
                  defaultValue={it?.description}
                  css={{
                    width: responsive ? "100%" : 450,
                  }}
                  onChange={(e: any) => updateDesc(e, index)}
                />

                {it.need_activation && (
                  <FontAwesomeIcon
                    style={{
                      alignSelf: "center",
                      color: !it?.activated
                        ? themeColors.pink
                        : themeColors.green,
                    }}
                    title={activateHint(it)}
                    icon={it.activated ? faBoltLightning : faPlay}
                    onClick={() => handleActivate(it)}
                  />
                )}
              </Flex>
            </Flex>
          </SelectableItem>
        ))}
    </Flex>
  );
};
