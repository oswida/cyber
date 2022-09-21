import { DiceRoll, DiceRoller } from "@dice-roller/rpg-dice-roller";
import { useAtom } from "jotai";
import { hasString, language } from "~/common";
import {
  corpDomain,
  corpName1,
  corpName3,
  corpNameDomain,
  corpSlogan,
} from "~/data";
import { CorpoType } from "./CorpoCard";

const roller = new DiceRoller();

export const useCorpoGen = () => {
  const [lang] = useAtom(language);
  const rollCorpo = () => {
    let roll = roller.roll(`1d${corpName1.length}`) as DiceRoll;
    const name1 = corpName1[roll.total - 1];

    roll = roller.roll(`1d${corpName3.length}`) as DiceRoll;
    const name3 = corpName3[roll.total - 1];
    const domains = [];
    const cndomain = corpNameDomain[lang];
    if (cndomain[name3]) {
      domains.push(cndomain[name3]);
    }
    const dl = (roller.roll("1d2") as DiceRoll).total;
    const cdomain = corpDomain[lang];
    while (domains.length < dl) {
      roll = roller.roll(`1d${cdomain.length}`) as DiceRoll;
      const t = cdomain[roll.total - 1];
      if (!hasString(domains, t)) domains.push(t);
    }
    const cslogan = corpSlogan[lang];
    roll = roller.roll(`1d${cslogan.length}`) as DiceRoll;
    const slogan = cslogan[roll.total - 1];
    return {
      name1: name1,
      name2: "",
      name3: name3,
      domains: domains,
      slogan: slogan,
    } as CorpoType;
  };

  return { rollCorpo };
};
