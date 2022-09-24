import { DiceRoll, DiceRoller } from "@dice-roller/rpg-dice-roller";
import { useAtomValue } from "jotai";
import { language } from "~/common";
import {
  npcGear,
  npcGoal,
  npcLook,
  npcNameTable,
  npcNegativeTrait,
  npcOccupation,
  npcPositiveTrait,
  npcSurnameTable,
  NpcType,
} from "~/data";

const roller = new DiceRoller();

export const useNpcGen = () => {
  const lang = useAtomValue(language);
  const rollNpc = () => {
    let roll = roller.roll(`1d${npcNameTable.length}`) as DiceRoll;
    const name = npcNameTable[roll.total - 1];
    roll = roller.roll(`1d${npcSurnameTable.length}`) as DiceRoll;
    const surname = npcSurnameTable[roll.total - 1];
    const ncg = npcGoal[lang];
    roll = roller.roll(`1d${ncg.length}`) as DiceRoll;
    const goal = ncg[roll.total - 1];
    const nocc = npcOccupation[lang];
    roll = roller.roll(`1d${nocc.length}`) as DiceRoll;
    const occ = nocc[roll.total - 1];
    const looks = [];
    const nl = npcLook[lang];
    roll = roller.roll(`1d${nl.length}`) as DiceRoll;
    looks.push(nl[roll.total - 1]);
    const ng = npcGear[lang];
    roll = roller.roll(`1d${ng.length}`) as DiceRoll;
    looks.push(ng[roll.total - 1]);
    const traits = [];
    const npt = npcPositiveTrait[lang];
    roll = roller.roll(`1d${npt.length}`) as DiceRoll;
    traits.push(npt[roll.total - 1]);
    const nnt = npcNegativeTrait[lang];
    roll = roller.roll(`1d${nnt.length}`) as DiceRoll;
    traits.push(nnt[roll.total - 1]);
    const result: NpcType[] = [];
    result.push({
      name: name,
      surname: surname,
      goal: goal,
      look: looks.join(". "),
      occupation: occ,
      traits: traits,
    } as NpcType);
    return result;
  };

  return { rollNpc };
};
