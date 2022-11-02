import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { langHud, stateSessionData } from "~/common";
import { Button, Flex, Text } from "~/component";
import { PFInput } from "./styles";
import { SubformProps } from "./usePlayerForm";

type Props = SubformProps;

export const StatForm = ({
  itemState,
  setValue,

  responsive,
}: Props) => {
  const sessionData = useAtomValue(stateSessionData);
  const psyRef = useRef<HTMLInputElement>(null);

  const toggleDeprived = () => {
    if (!itemState) return;
    setValue("deprived", itemState.deprived ? false : true);
  };

  const setStat = (
    v: any,
    stat: "bio" | "psy" | "inf" | "hp",
    index: number
  ) => {
    if (!itemState) return;
    const value = v.target.value;
    const newState = [...itemState[stat]];
    newState[index] = value;
    setValue(stat, newState);
  };

  const setArmor = (v: any) => {
    setValue("armor", v.target.value);
  };

  useEffect(() => {
    if (!psyRef.current) return;
    psyRef.current.value = `${itemState?.psy[0]}`;
  }, [itemState?.psy]);

  return (
    <Flex
      css={{
        gap: responsive ? 10 : 40,
        overflowY: responsive ? "auto" : undefined,
      }}
      direction={responsive ? "column" : undefined}
    >
      <Flex direction="column" center>
        <Text color="yellow" size="small">
          BIO
        </Text>
        <Flex>
          <PFInput
            center
            css={{ width: "2em" }}
            defaultValue={itemState?.bio ? itemState?.bio[0] : 0}
            maxLength={2}
            onChange={(e: any) => setStat(e, "bio", 0)}
          />
          /
          <PFInput
            center
            css={{ width: "2em" }}
            defaultValue={itemState?.bio ? itemState?.bio[1] : 0}
            maxLength={2}
            onChange={(e: any) => setStat(e, "bio", 1)}
          />
        </Flex>
      </Flex>

      <Flex direction="column" center>
        <Text color="yellow" size="small">
          PSY
        </Text>
        <Flex>
          <PFInput
            center
            css={{ width: "2em" }}
            defaultValue={itemState?.psy ? itemState?.psy[0] : 0}
            maxLength={2}
            onChange={(e: any) => setStat(e, "psy", 0)}
            ref={psyRef}
          />
          /
          <PFInput
            center
            css={{ width: "2em" }}
            defaultValue={itemState?.psy ? itemState?.psy[1] : 0}
            maxLength={2}
            onChange={(e: any) => setStat(e, "psy", 1)}
          />
        </Flex>
      </Flex>

      <Flex direction="column" center>
        <Text color="yellow" size="small">
          INF
        </Text>
        <Flex>
          <PFInput
            center
            css={{ width: "2em" }}
            defaultValue={itemState?.inf ? itemState?.inf[0] : 0}
            maxLength={2}
            onChange={(e: any) => setStat(e, "inf", 0)}
          />
          /
          <PFInput
            center
            css={{ width: "2em" }}
            defaultValue={itemState?.inf ? itemState?.inf[1] : 0}
            maxLength={2}
            onChange={(e: any) => setStat(e, "inf", 1)}
          />
        </Flex>
      </Flex>

      <Flex direction="column" center>
        <Text color="yellow" size="small">
          {langHud[sessionData.lang!!].hp}
        </Text>
        <Flex>
          <PFInput
            center
            css={{ width: "2em" }}
            defaultValue={itemState?.hp ? itemState?.hp[0] : 0}
            maxLength={2}
            onChange={(e: any) => setStat(e, "hp", 0)}
          />
          /
          <PFInput
            center
            css={{ width: "2em" }}
            defaultValue={itemState?.hp ? itemState?.hp[1] : 0}
            maxLength={2}
            onChange={(e: any) => setStat(e, "hp", 1)}
          />
        </Flex>
      </Flex>

      <Flex direction="column" center>
        <Text color="yellow" size="small">
          {langHud[sessionData.lang!!].armor}
        </Text>
        <Flex>
          <PFInput
            center
            css={{ width: "2em" }}
            defaultValue={itemState?.armor ?? 0}
            maxLength={2}
            onChange={setArmor}
          />
        </Flex>
      </Flex>

      <Flex direction="column" center={responsive ? true : undefined}>
        <Button
          onClick={toggleDeprived}
          size="small"
          border={itemState?.deprived ? "standard" : "underline"}
          color={itemState?.deprived ? "filled" : undefined}
          css={{ maxWidth: "max-content" }}
        >
          {langHud[sessionData.lang!!].deprived}
        </Button>
      </Flex>
    </Flex>
  );
};
