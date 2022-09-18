import { DiceRoll, DiceRoller } from "@dice-roller/rpg-dice-roller";
import { hasString } from "~/common";
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
  const rollNpc = () => {
    let roll = roller.roll(`1d${npcNameTable.length}`) as DiceRoll;
    const name = npcNameTable[roll.total - 1];
    roll = roller.roll(`1d${npcSurnameTable.length}`) as DiceRoll;
    const surname = npcSurnameTable[roll.total - 1];
    roll = roller.roll(`1d${npcGoal.length}`) as DiceRoll;
    const goal = npcGoal[roll.total - 1];
    roll = roller.roll(`1d${npcOccupation.length}`) as DiceRoll;
    const occ = npcOccupation[roll.total - 1];
    const looks = [];
    roll = roller.roll(`1d${npcLook.length}`) as DiceRoll;
    looks.push(npcLook[roll.total - 1]);
    roll = roller.roll(`1d${npcGear.length}`) as DiceRoll;
    looks.push(npcGear[roll.total - 1]);
    const traits = [];
    roll = roller.roll(`1d${npcPositiveTrait.length}`) as DiceRoll;
    traits.push(npcPositiveTrait[roll.total - 1]);
    roll = roller.roll(`1d${npcNegativeTrait.length}`) as DiceRoll;
    traits.push(npcNegativeTrait[roll.total - 1]);
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
