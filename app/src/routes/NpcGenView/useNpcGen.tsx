import { DiceRoll, DiceRoller } from "@dice-roller/rpg-dice-roller";
import { hasString } from "~/common";
import {
  npcGoal,
  npcLook,
  npcNameTable,
  npcOccupation,
  npcSurnameTable,
  npcTrait,
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
    while (looks.length < 2) {
      roll = roller.roll(`1d${npcLook.length}`) as DiceRoll;
      const l = npcLook[roll.total - 1];
      if (!hasString(looks, l)) looks.push(l);
    }
    const traits = [];
    while (traits.length < 2) {
      roll = roller.roll(`1d${npcTrait.length}`) as DiceRoll;
      const t = npcTrait[roll.total - 1];
      if (!hasString(traits, t)) traits.push(t);
    }
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
