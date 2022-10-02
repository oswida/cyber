import { DiceRoll, DiceRoller } from "@dice-roller/rpg-dice-roller";
import { useAtom } from "jotai";
import {
  RollHistoryEntry,
  selectedRollerDice,
  stateRollHistory,
} from "~/common";
import { Button, Flex, LeftTopButton, Text } from "~/component";
import { RollInfo } from "./styles";

export const RollResult = () => {
  const [selDice] = useAtom(selectedRollerDice);
  const roller = new DiceRoller();
  const [rollHistory, setRollHistory] = useAtom(stateRollHistory);

  const randomizeText = (elementId: string, roll: DiceRoll) => {
    const theLetters = "0123456789#%&^+=-"; //"abcdefghijklmnopqrstuvwxyz0123456789#%&^+=-";
    const speed = 20 / roll.rolls.length; // ms per frame
    const increment = 3; // frames per step. Must be >2

    const ctnt = roll.toString();
    let clen = ctnt.length;
    let si = 0;
    let stri = 0;
    let block = "";
    let fixed = "";

    const output = document.getElementById(elementId);
    if (!output) return;

    const nextFrame = (pos: number) => {
      for (let i = 0; i < clen - stri; i++) {
        //Random number
        var num = Math.floor(theLetters.length * Math.random());
        //Get random letter
        var letter = theLetters.charAt(num);
        block = block + letter;
      }
      if (si == increment - 1) {
        stri++;
      }
      if (si == increment) {
        // Add a letter;
        // every speed*10 ms
        fixed = fixed + ctnt.charAt(stri - 1);
        si = 0;
      }
      output.innerHTML = fixed + block;
      block = "";

      if (output.innerHTML == ctnt) {
        setRollHistory((state) => [
          ...state,
          { user: "", time: "", data: ctnt } as RollHistoryEntry,
        ]);
      }
    };

    //Call self x times, whole function wrapped in setTimeout
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
    const r = roller.roll(selDice) as DiceRoll;
    randomizeText("rollnum", r);
  };

  return (
    <RollInfo>
      <Flex direction="column">
        <Button
          noborder
          onClick={roll}
          css={{ borderBottom: "solid 1px $green" }}
        >
          Roll{" "}
          <span style={{ fontWeight: "bold", marginLeft: "0.5em" }}>
            {selDice}
          </span>
        </Button>
        <Button noborder>
          <Text id="rollnum" color="yellow" css={{ overflow: "hidden" }}></Text>
        </Button>
      </Flex>
    </RollInfo>
  );
};
