import { DiceRoll, DiceRoller } from "@dice-roller/rpg-dice-roller";
import { i18n } from "@lingui/core";
import { t, Trans } from "@lingui/macro";
import { useAtom, useAtomValue } from "jotai";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  RollHistoryEntry,
  selectedRollerDice,
  stateNats,
  stateRollHistory,
  stateSessionData,
} from "~/common";
import { topicRoll, useNats } from "~/common/nats";
import { useStorage } from "~/common/storage";
import { prettyNow, rollSingle } from "~/common/util";
import { Button, Flex, Input, Text } from "~/component";
import { RollInfo } from "./styles";

export const RollResult = () => {
  const [selDice] = useAtom(selectedRollerDice);
  const roller = new DiceRoller();
  const [rollHistory, setRollHistory] = useAtom(stateRollHistory);
  const done = useRef<boolean>(true);
  const commentRef = useRef<HTMLInputElement | null>(null);
  const sessionData = useAtomValue(stateSessionData);
  const { publish } = useNats();
  const nats = useAtomValue(stateNats);
  const { saveRolls } = useStorage();

  const randomizeText = (elementId: string, roll: DiceRoll) => {
    const theLetters = "0123456789#%&^+=-";
    const speed = 10 / roll.rolls.length;
    const increment = 3;

    const rollData = roll.toString();
    const ctnt = rollData;
    let clen = ctnt.length;
    let si = 0;
    let stri = 0;
    let block = "";
    let fixed = "";

    const output = document.getElementById(elementId);
    if (!output) return;

    const nextFrame = (pos: number) => {
      for (let i = 0; i < clen - stri; i++) {
        var num = Math.floor(theLetters.length * Math.random());
        var letter = theLetters.charAt(num);
        block = block + letter;
      }
      if (si == increment - 1) {
        stri++;
      }
      if (si == increment) {
        fixed = fixed + ctnt.charAt(stri - 1);
        si = 0;
      }
      output.innerHTML = fixed + block;
      block = "";

      if (output.innerHTML == ctnt && !done.current) {
        done.current = true;
        const newEntry: RollHistoryEntry = {
          id: uuidv4(),
          user: sessionData.username,
          time: prettyNow(),
          data: rollData,
          comment: commentRef.current?.value ? commentRef.current?.value : "",
          color: sessionData.color ? sessionData.color : "#ffffff",
        };
        const newState = [newEntry, ...rollHistory];
        setRollHistory(newState);
        saveRolls(newState);
        if (commentRef.current) commentRef.current.value = "";
        publish(nats.connection, topicRoll, [newEntry]);
      }
    };

    (function rustle(i) {
      setTimeout(function () {
        if (--i) {
          rustle(i);
        }
        nextFrame(i);
        si = si + 1;
      }, speed);
    })(clen * increment + 1);
  };

  const roll = () => {
    const r = rollSingle(roller, selDice);
    done.current = false;
    randomizeText("rollnum", r);
  };

  return (
    <RollInfo>
      <Flex direction="column">
        <Button border="underline" noupper onClick={roll}>
          <Trans>Roll</Trans>{" "}
          <span style={{ fontWeight: "bold", marginLeft: "0.5em" }}>
            {selDice}
          </span>
        </Button>
        <Input
          title={t`Input comment for a roll`}
          ref={commentRef}
          placeholder={`${t`Comment`}...`}
          small
        />
        <Text
          id="rollnum"
          color="yellow"
          css={{ overflow: "hidden", textAlign: "center" }}
        ></Text>
      </Flex>
    </RollInfo>
  );
};
