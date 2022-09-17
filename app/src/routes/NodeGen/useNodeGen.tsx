import { DiceRoll, DiceRoller } from "@dice-roller/rpg-dice-roller";
import {
  infoLook,
  NodeClass,
  NodeClassHP,
  NodeClassInf,
  NodeClassMore,
  NodeClassName,
  NodeData,
  NodeType,
} from "~/data";

const roller = new DiceRoller();

export const useNodeGen = () => {
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

  const rollICE = (nclass: NodeClass) => {
    switch (nclass) {
      case "Publiczny":
      case "Prywatny":
        return ["-", false];
      case "Prywatny strzeżony":
        const x = (roller.roll("1d6") as DiceRoll).total;
        if (x <= 3) return ["k6", false];
        break;
      case "Rządowy":
        return ["k6", false];
      case "Korporacyjny":
        const y = (roller.roll("1d6") as DiceRoll).total;
        if (y <= 2) return ["k8", true];
        return ["k8", false];
      case "Wojskowy":
        const z = (roller.roll("1d6") as DiceRoll).total;
        if (z <= 3) return ["k10", true];
        return ["k10", false];
      case "SI":
        return ["k12", true];
    }
    return "-";
  };

  const rollPersonel = (nclass: NodeClass) => {
    let chance = 0;
    switch (nclass) {
      case "Publiczny":
        chance = (roller.roll("1d6") as DiceRoll).total;
        if (chance == 1) {
          return "wolontariusz INT 10";
        }
        break;
      case "Prywatny strzeżony":
        chance = (roller.roll("1d6") as DiceRoll).total;
        if (chance <= 2) {
          return "haker INT 10";
        }
        break;
      case "Rządowy":
        chance = (roller.roll("1d3") as DiceRoll).total;
        return `${chance} × haker INT 12`;
      case "Korporacyjny":
        chance = (roller.roll("1d4") as DiceRoll).total;
        return `${chance} × haker INT 15`;
      case "Wojskowy":
        chance = (roller.roll("1d6") as DiceRoll).total;
        return `${chance} × haker INT 16`;
      case "SI":
        return "samoobrona INT 17";
    }
    return "";
  };

  const rollNode = (tp?: NodeClass) => {
    var roll: DiceRoll;
    let nclass: NodeClass | undefined = tp;
    if (!tp) {
      roll = roller.roll(`1d${NodeClassName.length}`) as DiceRoll;
      nclass = NodeClassName[roll.total - 1] as NodeClass;
    }
    roll = roller.roll(`1d${infoLook.length}`) as DiceRoll;
    const look = infoLook[roll.total - 1];
    roll = roller.roll(`1d${NodeData[nclass!!].length}`) as DiceRoll;
    const data = NodeData[nclass!!][roll.total - 1];
    const [ice, black] = rollICE(nclass as NodeClass);
    return [
      {
        name: generateSerialKeys(8, ""),
        ntype: nclass!!,
        hp: (roller.roll(NodeClassHP[nclass!!]) as DiceRoll).total,
        inf: (roller.roll(NodeClassInf[nclass!!]) as DiceRoll).total,
        ice: ice,
        black: black,
        more: NodeClassMore[nclass!!],
        security: rollPersonel(nclass!!),
        look: look,
        data: data,
      } as NodeType,
    ];
  };

  return { rollNode };
};
