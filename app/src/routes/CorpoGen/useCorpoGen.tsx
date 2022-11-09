import { DiceRoller } from "@dice-roller/rpg-dice-roller";
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import {
  CorpoInfo,
  doExport,
  doImport,
  hasString,
  language,
  prettyToday,
  rollSingle,
  stateGenerator,
  translateObject,
} from "~/common";
import { useStorage } from "~/common/storage";
import {
  dictCorpoDomain,
  dictCorpoGossip,
  dictCorpoNameDomain,
  dictCorpoNameFirst,
  dictCorpoNameSecond,
} from "~/data";

const roller = new DiceRoller();

export const useCorpoGen = () => {
  const [lang] = useAtom(language);
  const [gen, setGen] = useAtom(stateGenerator);
  const { saveGen } = useStorage();

  const rollCorpo = () => {
    let roll = rollSingle(roller, `1d${dictCorpoNameFirst.length}`);
    const name1 = dictCorpoNameFirst[roll.total - 1];
    roll = rollSingle(roller, `1d${dictCorpoNameSecond.length}`);
    const name2 = dictCorpoNameSecond[roll.total - 1];
    const domains = [];
    if (Object.hasOwn(dictCorpoNameDomain, name2)) {
      domains.push(
        Object.entries(dictCorpoNameDomain).filter((e) => e[0] === name2)[0][1]
      );
    }
    const dl = rollSingle(roller, "1d3").total;
    while (domains.length < dl) {
      roll = rollSingle(roller, `1d${dictCorpoDomain.length}`);
      const t = dictCorpoDomain[roll.total - 1];
      if (!hasString(domains, t)) domains.push(t);
    }

    roll = rollSingle(roller, `1d${dictCorpoGossip.length}`);
    const gossip = dictCorpoGossip[roll.total - 1];

    const retv: CorpoInfo = {
      id: uuidv4(),
      name: `${name1} ${name2}`,
      operations: domains,
      gossip: gossip,
      resources: [], //TODO
      employeeProfile: "", //TODO
    };

    return translateObject(retv);
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
