import { useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { langHud, PcInfo, stateSessionData } from "~/common";
import { Button, Flex, Text } from "~/component";
import { PFInput } from "./styles";
import { SubformProps } from "./usePlayerForm";

export const BasicForm = ({ itemState, setValue }: SubformProps) => {
  const sessionData = useAtomValue(stateSessionData);
  const psyRef = useRef(null);

  const toggleShared = () => {
    if (!itemState) return;
    setValue("shared", !itemState.shared);
  };

  const setName = (v: any) => {
    setValue("name", v.target.value);
  };

  const setCredits = (v: any) => {
    setValue("credits", v.target.value);
  };

  const setSubscription = (v: any) => {
    setValue("subscription", v.target.value);
  };

  return (
    <Flex css={{ gap: 40 }} center>
      <Flex direction="column" css={{ flex: 1 }}>
        <Text color="yellow" size="small">
          {langHud[sessionData.lang!!].name}
        </Text>
        <PFInput
          css={{
            width: 250,
          }}
          defaultValue={itemState?.name ?? ""}
          onChange={setName}
        />
      </Flex>
      <Flex direction="column">
        <Text color="yellow" size="small">
          {langHud[sessionData.lang!!].credits}
        </Text>

        <PFInput
          defaultValue={itemState?.credits ?? 0}
          onChange={setCredits}
          css={{
            width: 130,
          }}
        />
      </Flex>
      <Flex direction="column">
        <Text color="yellow" size="small">
          {langHud[sessionData.lang!!].subscription}
        </Text>
        <PFInput
          css={{
            width: 130,
          }}
          defaultValue={itemState?.subscription ?? ""}
          onChange={setSubscription}
        />
      </Flex>
      <Button
        size="small"
        color={itemState?.shared ? "green" : undefined}
        css={{ alignSelf: "center" }}
        onClick={toggleShared}
      >
        {itemState?.shared
          ? langHud[sessionData.lang!!].shared
          : langHud[sessionData.lang!!].private}
      </Button>
    </Flex>
  );
};
