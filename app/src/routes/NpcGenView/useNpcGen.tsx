import { DiceRoll } from "@dice-roller/rpg-dice-roller";
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

export const useNpcGen = () => {
  const rollNpc = () => {
    let roll = new DiceRoll(`1d${npcNameTable.length}`);
    const name = npcNameTable[roll.total - 1];
    roll = new DiceRoll(`1d${npcSurnameTable.length}`);
    const surname = npcSurnameTable[roll.total - 1];
    roll = new DiceRoll(`1d${npcGoal.length}`);
    const goal = npcGoal[roll.total - 1];
    roll = new DiceRoll(`1d${npcOccupation.length}`);
    const occ = npcOccupation[roll.total - 1];
    const looks = [];
    while (looks.length < 2) {
      roll = new DiceRoll(`1d${npcLook.length}`);
      const l = npcLook[roll.total - 1];
      if (!hasString(looks, l)) looks.push(l);
    }
    const traits = [];
    while (traits.length < 2) {
      roll = new DiceRoll(`1d${npcTrait.length}`);
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
