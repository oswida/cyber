import {
  DiceRoll,
  DiceRoller,
  NumberGenerator,
} from "@dice-roller/rpg-dice-roller";
import { hasString } from "~/common";
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
  const rollCorpo = () => {
    let roll = roller.roll(`1d${corpName1.length}`) as DiceRoll;
    const name1 = corpName1[roll.total - 1];

    roll = roller.roll(`1d${corpName3.length}`) as DiceRoll;
    const name3 = corpName3[roll.total - 1];
    const domains = [];
    if (corpNameDomain[name3]) {
      domains.push(corpNameDomain[name3]);
    }
    const dl = (roller.roll("1d2") as DiceRoll).total;
    while (domains.length < dl) {
      roll = roller.roll(`1d${corpDomain.length}`) as DiceRoll;
      const t = corpDomain[roll.total - 1];
      if (!hasString(domains, t)) domains.push(t);
    }
    roll = roller.roll(`1d${corpSlogan.length}`) as DiceRoll;
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
