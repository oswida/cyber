import { DiceRoller } from "@dice-roller/rpg-dice-roller";
import { useAtom, useAtomValue } from "jotai";
import { v4 as uuidv4 } from "uuid";
import {
  doExport,
  doImport,
  language,
  NpcInfo,
  prettyToday,
  rollSingle,
  stateGenerator,
  toNpcInfo,
} from "~/common";
import { useStorage } from "~/common/storage";
import {
  npcGear,
  npcGoal,
  npcLook,
  npcNameTable,
  npcNegativeTrait,
  npcOccupation,
  npcPositiveTrait,
  npcSurnameTable,
} from "~/data";

const roller = new DiceRoller();

export const useNpcGen = () => {
  const lang = useAtomValue(language);
  const [gen, setGen] = useAtom(stateGenerator);
  const { saveGen } = useStorage();

  const rollNpc = () => {
    let roll = rollSingle(roller, `1d${npcNameTable.length}`);
    const name = npcNameTable[roll.total - 1];
    roll = rollSingle(roller, `1d${npcSurnameTable.length}`);
    const surname = npcSurnameTable[roll.total - 1];
    const ncg = npcGoal[lang];
    roll = rollSingle(roller, `1d${ncg.length}`);
    const goal = ncg[roll.total - 1];
    const nocc = npcOccupation[lang];
    roll = rollSingle(roller, `1d${nocc.length}`);
    const occ = nocc[roll.total - 1];
    const looks = [];
    const nl = npcLook[lang];
    roll = rollSingle(roller, `1d${nl.length}`);
    looks.push(nl[roll.total - 1]);
    const ng = npcGear[lang];
    roll = rollSingle(roller, `1d${ng.length}`);
    looks.push(ng[roll.total - 1]);
    const traits = [];
    const npt = npcPositiveTrait[lang];
    roll = rollSingle(roller, `1d${npt.length}`);
    traits.push(npt[roll.total - 1]);
    const nnt = npcNegativeTrait[lang];
    roll = rollSingle(roller, `1d${nnt.length}`);
    traits.push(nnt[roll.total - 1]);
    const result: NpcInfo = {
      id: uuidv4(),
      name: name,
      surname: surname,
      goal: goal,
      look: looks[0],
      gear: looks[1],
      occupation: occ,
      traits: traits,
    };
    return result;
  };

  const generate = () => {
    const item = rollNpc();
    const newState = { ...gen };
    newState.npc[item.id] = item;
    setGen(newState);
    saveGen(newState);
  };

  const clean = () => {
    const newState = { ...gen, npc: {} };
    setGen(newState);
    saveGen(newState);
  };

  const exportData = () => {
    const filename = `npc-${prettyToday()}.json`;
    doExport(gen.npc, filename);
  };

  const importData = () => {
    doImport((data: any) => {
      const newState = { ...gen, npc: data };
      setGen(newState);
      saveGen(newState);
    });
  };

  const deleteNpc = (id: string) => {
    const newList: Record<string, NpcInfo> = {};
    Object.keys(gen.npc).forEach((k) => {
      if (k !== id && gen.npc[k]) newList[k] = toNpcInfo(gen.npc[k]);
    });
    const newState = { ...gen, npc: newList };
    setGen(newState);
    saveGen(newState);
  };

  return { rollNpc, generate, clean, exportData, importData, deleteNpc };
};
