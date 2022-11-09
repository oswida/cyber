import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "@lingui/macro";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef } from "react";
import { selectedRollerDice, stateSessionData, styled } from "~/common";
import { Button, Flex, InputButton, Text } from "~/component";

const Icon = styled(FontAwesomeIcon, {
  "&:hover": {
    color: "$blue",
  },
});

export const RollButton = () => {
  const numRef = useRef<HTMLInputElement | null>(null);
  const diceRef = useRef<HTMLInputElement | null>(null);
  const [selDice, setSelDice] = useAtom(selectedRollerDice);
  const sessionData = useAtomValue(stateSessionData);

  const updateDice = () => {
    if (!numRef.current || !diceRef.current) return;
    setSelDice(`${numRef.current.value}d${diceRef.current.value}`);
  };

  const inc = () => {
    if (!numRef.current || !diceRef.current) return;
    const num = Number.parseInt(numRef.current.value);
    if (Number.isNaN(num)) {
      numRef.current.value = "1";
      updateDice();
      return;
    }
    numRef.current.value = `${num + 1}`;
    updateDice();
  };

  const dec = () => {
    if (!numRef.current || !diceRef.current) return;
    const num = Number.parseInt(numRef.current.value);
    if (Number.isNaN(num)) {
      numRef.current.value = "1";
      updateDice();
      return;
    }
    if (num > 1) {
      numRef.current.value = `${num - 1}`;
      updateDice();
    }
  };

  const incDice = () => {
    if (!numRef.current || !diceRef.current) return;
    const num = Number.parseInt(diceRef.current.value);
    if (Number.isNaN(num)) {
      diceRef.current.value = "1";
      updateDice();
      return;
    }
    diceRef.current.value = `${num + 1}`;
    updateDice();
  };

  const decDice = () => {
    if (!numRef.current || !diceRef.current) return;
    const num = Number.parseInt(diceRef.current.value);
    if (Number.isNaN(num)) {
      diceRef.current.value = "1";
      updateDice();
      return;
    }
    if (num > 1) {
      diceRef.current.value = `${num - 1}`;
      updateDice();
    }
  };

  const setDice = (n: number) => {
    if (!diceRef.current) return;
    diceRef.current.value = `${n}`;
    updateDice();
  };

  useEffect(() => {
    if (!numRef.current || !diceRef.current) return;
    numRef.current.value = "1";
    diceRef.current.value = "4";
    updateDice();
  }, []);

  return (
    <Flex direction="column">
      <Flex center>
        <Flex>
          <Button
            size="small"
            border="underline"
            noupper
            onClick={() => setDice(4)}
          >
            d4
          </Button>
          <Button
            size="small"
            border="underline"
            noupper
            onClick={() => setDice(6)}
          >
            d6
          </Button>
          <Button
            size="small"
            border="underline"
            noupper
            onClick={() => setDice(8)}
          >
            d8
          </Button>
          <Button
            size="small"
            border="underline"
            noupper
            onClick={() => setDice(10)}
          >
            d10
          </Button>

          <Button
            size="small"
            border="underline"
            noupper
            onClick={() => setDice(12)}
          >
            d12
          </Button>
          <Button
            size="small"
            border="underline"
            noupper
            onClick={() => setDice(20)}
          >
            d20
          </Button>
          <Button
            size="small"
            border="underline"
            noupper
            onClick={() => setDice(100)}
          >
            d100
          </Button>
        </Flex>
      </Flex>
      <Flex center>
        <Flex direction="column">
          <Icon icon={faPlus} onClick={inc} />
          <InputButton
            onChange={updateDice}
            title={t`Scroll to inc/dec`}
            type="number"
            ref={numRef}
            maxLength={2}
            min={1}
            css={{ maxWidth: "2.5em" }}
          />
          <Icon icon={faMinus} onClick={dec} />
        </Flex>
        <Text color="yellow"> d</Text>
        <Flex>
          <Flex direction="column">
            <Icon icon={faPlus} onClick={incDice} />
            <InputButton
              onChange={updateDice}
              title={t`Scroll to inc/dec`}
              type="number"
              ref={diceRef}
              maxLength={3}
              min={1}
              css={{ maxWidth: "3.5em" }}
            />
            <Icon icon={faMinus} onClick={decDice} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
