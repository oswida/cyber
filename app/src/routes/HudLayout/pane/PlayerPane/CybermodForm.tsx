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
import { useState } from "react";
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  langHud,
  PcInfo,
  PcMod,
  stateSessionData,
  themeColors,
} from "~/common";
import { Button, Flex, Text } from "~/component";
import { PFInput, SelectableItem } from "./styles";

type Props = {
  getValues: UseFormGetValues<PcInfo>;
  setValue: UseFormSetValue<PcInfo>;
  register: UseFormRegister<PcInfo>;
  cybermods: PcMod[];
};

export const CybermodForm = ({
  getValues,
  setValue,
  register,
  cybermods,
}: Props) => {
  const [selInv, setSelInv] = useState(-1);
  const [folded, setFolded] = useState(false);
  const sessionData = useAtomValue(stateSessionData);

  const addMod = () => {
    const entry: PcMod = {
      id: uuidv4(),
      name: "cybermod",
      activated: false,
      need_activation: false,
      description: "",
    };
    const info = getValues();
    if (info.cybermods) {
      setValue("cybermods", [...info.cybermods, entry]);
    } else {
      setValue("cybermods", [entry]);
    }
    setFolded(false);
  };

  const delMod = () => {
    if (cybermods.length <= selInv || selInv < 0) return;
    const newState = [...cybermods];
    newState.splice(selInv, 1);
    setValue("cybermods", newState);
  };

  const activationHint = (it: PcMod) => {
    return it.need_activation
      ? "Needs to be activated. Click to switch."
      : "Works without activation. Click to switch.";
  };

  const activateHint = (it: PcMod) => {
    return it.activated
      ? "Cybermod activated. Click after action to switch off."
      : "Cybermod inactive. Click to activate.";
  };

  const handleNeedsActivation = (it: PcMod) => {
    const info = getValues();
    info.cybermods.forEach((cb) => {
      if (cb.id === it.id) {
        cb.need_activation = !cb.need_activation;
      }
    });
    setValue("cybermods", [...info.cybermods]);
  };

  const handleActivate = (it: PcMod) => {
    const info = getValues();
    let freeSlots = info.inventory.filter((it) => !it.fatigue).length;
    if (!it.activated) {
      if (freeSlots === 0) {
        alert("Cannot activate cybermod! Character has full fatigue");
        return;
      }
      for (let i = 0; i < info.inventory.length; i++) {
        if (!info.inventory[i].fatigue) {
          info.inventory[i].fatigue = true;
          freeSlots--;
          break;
        }
      }
      setValue("inventory", [...info.inventory]);
      if (freeSlots === 0) {
        alert(
          "Last inventory slot fatigued! Character suffers PSY damage from cybermod overuse."
        );
        setValue("psy.0", info.psy[0] > 0 ? info.psy[0] - 1 : 0);
      }
    }
    info.cybermods.forEach((cb) => {
      if (cb.id === it.id) {
        cb.activated = !cb.activated;
      }
    });
    setValue("cybermods", [...info.cybermods]);
  };

  return (
    <Flex direction="column">
      <Flex center css={{ gap: 20 }}>
        {cybermods && cybermods.length > 0 && (
          <Button border="underline" onClick={() => setFolded(!folded)}>
            <FontAwesomeIcon icon={folded ? faArrowDown : faArrowUp} />
          </Button>
        )}
        <Text color="yellow" size="small">
          {langHud[sessionData.lang!!].cybermods} (
          {cybermods ? cybermods.length : "0"})
        </Text>
        <Button border="underline" onClick={addMod}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Button border="underline" onClick={delMod}>
          <FontAwesomeIcon icon={faMinus} />
        </Button>
      </Flex>
      {cybermods &&
        !folded &&
        cybermods.map((it, index) => (
          <SelectableItem
            key={`cmod-${index}`}
            selected={selInv === index}
            onClick={() => setSelInv(index)}
          >
            <Flex>
              <PFInput
                small
                border="down"
                defaultValue={it?.name}
                css={{
                  width: 250,
                }}
                {...register(`cybermods.${index}.name`)}
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
              <PFInput
                small
                border="down"
                defaultValue={it?.description}
                css={{
                  width: 450,
                }}
                {...register(`cybermods.${index}.description`)}
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
          </SelectableItem>
        ))}
    </Flex>
  );
};
