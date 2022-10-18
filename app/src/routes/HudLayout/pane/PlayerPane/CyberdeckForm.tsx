import {
  faBoltLightning,
  faMinus,
  faPlus,
  faArrowDown,
  faArrowUp,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  UseFormGetValues,
  UseFormSetValue,
  UseFormRegister,
} from "react-hook-form";
import { PcInfo, PcMod, themeColors } from "~/common";
import { Flex, Button, Text } from "~/component";
import { PFInput, SelectableItem } from "./styles";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

type Props = {
  getValues: UseFormGetValues<PcInfo>;
  setValue: UseFormSetValue<PcInfo>;
  register: UseFormRegister<PcInfo>;
  cyberdeck: PcMod[];
};

export const CyberdeckForm = ({
  getValues,
  setValue,
  register,
  cyberdeck,
}: Props) => {
  const [selInv, setSelInv] = useState(-1);
  const [folded, setFolded] = useState(false);

  const activateHint = (it: PcMod) => {
    return it.activated
      ? "Program activated. Click to switch off."
      : "Program inactive. Click to run.";
  };

  const addProg = () => {
    const entry: PcMod = {
      id: uuidv4(),
      name: "program",
      activated: false,
      need_activation: true,
      description: "",
    };
    const info = getValues();
    if (info.cyberdeck) {
      setValue("cyberdeck", [...info.cyberdeck, entry]);
    } else {
      setValue("cyberdeck", [entry]);
    }
  };

  const delProg = () => {
    if (cyberdeck.length <= selInv || selInv < 0) return;
    const newState = [...cyberdeck];
    newState.splice(selInv, 1);
    setValue("cyberdeck", newState);
  };

  const handleActivate = (it: PcMod) => {
    const info = getValues();
    const bias = Math.ceil(info.inf[0] / 3);
    const anum = info.cyberdeck.filter((it) => it.activated).length;
    if (!it.activated && anum >= bias) {
      alert(
        `Cannot activate more than ${bias} programs. Current INF is ${info.inf[0]}`
      );
      return;
    }
    info.cyberdeck.forEach((cb) => {
      if (cb.id === it.id) {
        cb.activated = !cb.activated;
      }
    });
    setValue("cyberdeck", [...info.cyberdeck]);
  };

  return (
    <Flex direction="column">
      <Flex center css={{ gap: 20 }}>
        {cyberdeck && cyberdeck.length > 0 && (
          <Button border="underline" onClick={() => setFolded(!folded)}>
            <FontAwesomeIcon icon={folded ? faArrowDown : faArrowUp} />
          </Button>
        )}
        <Text color="yellow" size="small">
          Cyberdeck ({cyberdeck ? cyberdeck.length : "0"})
        </Text>
        <Button border="underline" onClick={addProg}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Button border="underline" onClick={delProg}>
          <FontAwesomeIcon icon={faMinus} />
        </Button>
      </Flex>
      {cyberdeck &&
        !folded &&
        cyberdeck.map((it, index) => (
          <SelectableItem key={`cdeck-${index}`}>
            <Flex>
              <PFInput
                small
                border="down"
                defaultValue={it?.name}
                css={{
                  width: 250,
                }}
                {...register(`cyberdeck.${index}.name`)}
              />
              <PFInput
                small
                border="down"
                defaultValue={it?.description}
                css={{
                  width: 450,
                }}
                {...register(`cyberdeck.${index}.description`)}
              />
              <FontAwesomeIcon
                style={{
                  alignSelf: "center",
                  color: !it?.activated ? themeColors.pink : themeColors.green,
                }}
                icon={it.activated ? faBoltLightning : faPlay}
                title={activateHint(it)}
                onClick={() => handleActivate(it)}
              />
            </Flex>
          </SelectableItem>
        ))}
    </Flex>
  );
};
