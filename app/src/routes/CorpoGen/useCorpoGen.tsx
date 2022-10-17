import { DiceRoll, DiceRoller } from "@dice-roller/rpg-dice-roller";
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import {
  CorpoInfo,
  doExport,
  doImport,
  hasString,
  language,
  prettyToday,
  stateGenerator,
} from "~/common";
import { useStorage } from "~/common/storage";
import {
  corpDomain,
  corpGossip,
  corpName1,
  corpName2,
  corpNameDomain,
  corpSlogan,
} from "~/data";

const roller = new DiceRoller();

export const useCorpoGen = () => {
  const [lang] = useAtom(language);
  const [gen, setGen] = useAtom(stateGenerator);
  const { saveGen } = useStorage();

  const rollCorpo = () => {
    let roll = roller.roll(`1d${corpName1.length}`) as DiceRoll;
    const name1 = corpName1[roll.total - 1];
    roll = roller.roll(`1d${corpName2.length}`) as DiceRoll;
    const name2 = corpName2[roll.total - 1];

    const domains = [];
    const cndomain = corpNameDomain[lang];
    if (cndomain[name2]) {
      domains.push(cndomain[name2]);
    }

    const dl = (roller.roll("1d3") as DiceRoll).total;
    const cdomain = corpDomain[lang];
    while (domains.length < dl) {
      roll = roller.roll(`1d${cdomain.length}`) as DiceRoll;
      const t = cdomain[roll.total - 1];
      if (!hasString(domains, t)) domains.push(t);
    }
    const cslogan = corpSlogan[lang];
    roll = roller.roll(`1d${cslogan.length}`) as DiceRoll;
    const slogan = cslogan[roll.total - 1];

    const cgossip = corpGossip[lang];
    roll = roller.roll(`1d${cgossip.length}`) as DiceRoll;
    const gossip = cgossip[roll.total - 1];

    const retv: CorpoInfo = {
      id: uuidv4(),
      name: `${name1} ${name2}`,
      operations: domains,
      slogan: slogan,
      gossip: gossip,
    };
    return retv;
  };

  const generate = () => {
    const item = rollCorpo();
    const newState = { ...gen };
    newState.corpo[item.id] = item;
    setGen(newState);
    saveGen(newState);
  };

  const clean = () => {
    const newState = { ...gen, corpo: {} };
    setGen(newState);
    saveGen(newState);
  };

  const exportData = () => {
    const filename = `zaibatsu-${prettyToday()}.json`;
    doExport(gen.corpo, filename);
  };

  const importData = () => {
    doImport((data: any) => {
      const newState = { ...gen, corpo: data };
      setGen(newState);
      saveGen(newState);
    });
  };

  return { rollCorpo, generate, clean, exportData, importData };
};
