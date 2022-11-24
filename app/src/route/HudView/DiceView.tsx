import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { useI18n } from "@solid-primitives/i18n";
import { Component, For } from "solid-js";
import {
  inodRollsKey,
  mqttPublish,
  prettyNow,
  RollInfo,
  rollSingle,
  saveGenericData,
  topicRoll,
  useAppData,
} from "~/common";
import { Button, Flex, Input, Texte, Tooltip } from "~/component";
import {
  DiceViewRootStyle,
  RollHistoryStyle,
  RollInfoStyle,
} from "./styles.css";
import { v4 as uuidv4 } from "uuid";
import { DiceRollButton } from "./DiceRollButton";
import { FaSolidTrashCan } from "solid-icons/fa";

export const DiceView: Component = () => {
  const [t] = useI18n();
  const apd = useAppData();

  let commentRef: HTMLInputElement;
  let done = false;
  let outputRef: HTMLDivElement;

  const randomizeText = (
    roll: DiceRoll,
    username: string,
    comment: string,
    color: string,
    cb: () => void
  ) => {
    const theLetters = "0123456789#%&^+=-";
    const speed = 10 / roll.rolls.length;
    const increment = 3;

    const rollData = roll.toString().replace("d", t("dice_letter"));
    const ctnt = rollData;
    let clen = ctnt.length;
    let si = 0;
    let stri = 0;
    let block = "";
    let fixed = "";

    if (!outputRef) return;

    const nextFrame = (pos: number) => {
      if (!outputRef || !apd) return;
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
      outputRef.innerHTML = fixed + block;
      block = "";

      if (outputRef.innerHTML == ctnt && !done) {
        done = true;
        const newEntry: RollInfo = {
          id: uuidv4(),
          user: username,
          time: prettyNow(),
          data: rollData,
          comment: comment,
          color: color,
        };
        const newState = [newEntry, ...apd.rollHistory()];
        apd.setRollHistory(newState);
        saveGenericData(apd, inodRollsKey, newState);
        cb();
        const client = apd.mqttClient();
        if (!client) return;
        mqttPublish(apd.sessionData().browserID, client, topicRoll, [newEntry]);
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
    if (!apd) return;
    const r = rollSingle(apd.selectedDice());
    done = false;
    const sd = apd.sessionData();
    if (!sd || !commentRef) return;
    randomizeText(
      r,
      sd.username,
      commentRef.value,
      sd.color ? sd.color : "#fff",
      () => {
        if (!commentRef) return;
        commentRef.value = "";
      }
    );
  };

  const clearRolls = () => {
    if (!apd) return;
    apd.setRollHistory([]);
    saveGenericData(apd, inodRollsKey, []);
  };

  return (
    <div class={DiceViewRootStyle}>
      <div class={RollInfoStyle}>
        <Flex type="column">
          <Button noupper size="bigger" border="underline" onClick={roll}>
            {t("Roll")}
            <span style={{ "font-weight": "bold", "margin-left": "0.5em" }}>
              {apd?.selectedDice().replace("d", t("dice_letter"))}
            </span>
          </Button>
          <Input
            title={t("Input comment for a roll")}
            ref={(el) => (commentRef = el)}
            placeholder={`${t("Comment")}...`}
            small
          />
          <Texte
            ref={(el) => (outputRef = el)}
            color="yellow"
            style={{ overflow: "hidden", "text-align": "center" }}
          ></Texte>
        </Flex>
      </div>
      <Flex style={{ position: "relative" }}>
        <DiceRollButton />
        <FaSolidTrashCan
          style={{
            bottom: "0px",
            right: "0px",
            position: "absolute",
            cursor: "pointer",
          }}
          onClick={clearRolls}
        />
      </Flex>
      <div class={RollHistoryStyle}>
        <For each={apd?.rollHistory()}>
          {(entry) => (
            <Flex title={`${entry.time} ${entry.comment}`}>
              <Texte style={{ color: entry.color }}>{entry.user}</Texte>
              <Texte>{entry.data}</Texte>
            </Flex>
          )}
        </For>
      </div>
    </div>
  );
};
