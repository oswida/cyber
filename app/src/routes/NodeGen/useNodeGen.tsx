import { DiceRoll, DiceRoller } from "@dice-roller/rpg-dice-roller";
import { useAtomValue } from "jotai";
import { globalStr, language } from "~/common";
import {
  infoData,
  infoLook,
  NodeClassDict,
  NodeClassHP,
  NodeClassInf,
  NodeClassMore,
  NodeType,
} from "~/data";

const roller = new DiceRoller();

const nodetype = ["pub", "priv", "privsec", "gov", "corp", "mil", "ai"];

export const useNodeGen = () => {
  const lang = useAtomValue(language);

  function generateSerialKeys(length: number, separator: string) {
    separator = separator || "-";
    var license = new Array(length + 1)
      .join((Math.random().toString(36) + "00000000000000000").slice(2, 18))
      .slice(0, length);
    return license
      .toUpperCase()
      .replace(/(\w{4})/g, "$1" + separator)
      .substring(0, length + Math.round(length / 4) - 1);
  }

  const rollICE = (nclass: string) => {
    switch (nclass) {
      case "pub":
      case "priv":
        return ["-", false];
      case "privsec":
        let x = (roller.roll("1d6") as DiceRoll).total;
        if (x <= 3) return [globalStr[lang]["d6"], false];
        break;
      case "gov":
        x = (roller.roll("1d6") as DiceRoll).total;
        if (x <= 3) return [globalStr[lang]["d6"], false];
        else return [globalStr[lang]["d8"], false];
      case "corp":
        const y = (roller.roll("1d6") as DiceRoll).total;
        if (y <= 2) return [globalStr[lang]["d8"], true];
        return [globalStr[lang]["d8"], false];
      case "mil":
        const z = (roller.roll("1d6") as DiceRoll).total;
        if (z <= 3) return [globalStr[lang]["d10"], true];
        return [globalStr[lang]["d10"], false];
      case "ai":
        return [globalStr[lang]["d12"], true];
    }
    return "-";
  };

  const rollPersonel = (nclass: string) => {
    let chance = 0;
    switch (nclass) {
      case "pub":
        chance = (roller.roll("1d6") as DiceRoll).total;
        if (chance == 1) {
          return `${globalStr[lang]["volunteer"]} INF 10`;
        }
        break;
      case "privsec":
        chance = (roller.roll("1d6") as DiceRoll).total;
        if (chance <= 2) {
          return `${globalStr[lang]["hacker"]} INF 10`;
        }
        break;
      case "gov":
        chance = (roller.roll("1d3") as DiceRoll).total;
        return `${chance} × haker INF 12`;
      case "corp":
        chance = (roller.roll("1d4") as DiceRoll).total;
        return `${chance} × haker INF 15`;
      case "mil":
        chance = (roller.roll("1d6") as DiceRoll).total;
        return `${chance} × ${globalStr[lang]["hacker"]} INF 16`;
      case "ai":
        return `${globalStr[lang]["selfdefense"]} INF 17`;
    }
    return "";
  };

  const rollNode = (tp?: string) => {
    var roll: DiceRoll;
    let nclass: string | undefined = tp;
    if (!tp) {
      roll = roller.roll(`1d${nodetype.length}`) as DiceRoll;
      nclass = nodetype[roll.total - 1] as string;
    }
    roll = roller.roll(`1d${infoLook[lang].length}`) as DiceRoll;
    const look = infoLook[lang][roll.total - 1];
    roll = roller.roll(`1d${infoData[lang][nclass!!].length}`) as DiceRoll;
    const data = infoData[lang][nclass!!][roll.total - 1];
    console.log("data", data);
    const [ice, black] = rollICE(nclass as string);

    return [
      {
        name: generateSerialKeys(8, ""),
        ntype: NodeClassDict[lang][nclass!!],
        hp: (roller.roll(NodeClassHP[nclass!!]) as DiceRoll).total,
        inf: (roller.roll(NodeClassInf[nclass!!]) as DiceRoll).total,
        ice: ice,
        black: black,
        more: NodeClassMore[lang][nclass!!],
        security: rollPersonel(nclass!!),
        look: look,
        data: data,
      } as NodeType,
    ];
  };

  return { rollNode };
};
