import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { hasString } from "~/common";
import {
  corpDomain,
  corpName1,
  corpName3,
  corpNameDomain,
  corpSlogan,
} from "~/data";
import { CorpoType } from "./CorpoCard";

export const useCorpoGen = () => {
  const rollCorpo = () => {
    let roll = new DiceRoll(`1d${corpName1.length}`);
    const name1 = corpName1[roll.total - 1];

    roll = new DiceRoll(`1d${corpName3.length}`);
    const name3 = corpName3[roll.total - 1];
    const domains = [];
    if (corpNameDomain[name3]) {
      domains.push(corpNameDomain[name3]);
    }
    const dl = new DiceRoll("1d2").total;
    while (domains.length < dl) {
      roll = new DiceRoll(`1d${corpDomain.length}`);
      const t = corpDomain[roll.total - 1];
      if (!hasString(domains, t)) domains.push(t);
    }
    roll = new DiceRoll(`1d${corpSlogan.length}`);
    const slogan = corpSlogan[roll.total - 1];
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
