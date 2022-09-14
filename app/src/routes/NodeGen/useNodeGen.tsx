import { DiceRoll, DiceRoller } from "@dice-roller/rpg-dice-roller";
import { infoData, infoLook, infoType, NodeType } from "~/data";

const roller = new DiceRoller();

type nt =
  | "Publiczny"
  | "Prywatny"
  | "Prywatny strzeżony"
  | "Rządowy"
  | "Korporacyjny"
  | "Wojskowy"
  | "SI";

const ntypeDice = {
  ochr: {
    Publiczny: "1d3",
    Prywatny: "1d6",
    "Prywatny strzeżony": "1d6+3",
    Rządowy: "1d6+6",
    Korporacyjny: "1d8+6",
    Wojskowy: "1d10+6",
    SI: "2d6+6",
  },
  int: {
    Publiczny: "1d6",
    Prywatny: "1d6+2",
    "Prywatny strzeżony": "1d8+3",
    Rządowy: "1d8+6",
    Korporacyjny: "1d10+6",
    Wojskowy: "1d12+6",
    SI: "2d6+8",
  },
};

const ntypeMore = {
  Publiczny: "",
  Prywatny: "",
  "Prywatny strzeżony": "",
  Rządowy: "alarmy informujące o ataku",
  Korporacyjny: "alarmy, śledzenie włamywacza ",
  Wojskowy: "alarmy, śledzenie włamywacza",
  SI: "LOD czarny lub biały, wybór SI",
};

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

  const rollNType = (ntype: nt, dice: "ochr" | "int") => {
    const x = ntypeDice[dice];
    return (roller.roll(x[ntype]) as DiceRoll).total;
  };

  const rollLOD = (ntype: nt) => {
    switch (ntype) {
      case "Publiczny":
      case "Prywatny":
        return "-";
      case "Prywatny strzeżony":
        const x = (roller.roll("1d6") as DiceRoll).total;
        if (x <= 3) return "k6";
        break;
      case "Rządowy":
        return "k6";
      case "Korporacyjny":
        const y = (roller.roll("1d6") as DiceRoll).total;
        if (y <= 2) return "k8, CZ";
        return "k8";
      case "Wojskowy":
        const z = (roller.roll("1d6") as DiceRoll).total;
        if (z <= 3) return "k10, CZ";
        return "k10";
      case "SI":
        return "k12";
    }
    return "-";
  };

  const rollPersonel = (ntype: nt) => {
    let chance = 0;
    switch (ntype) {
      case "Publiczny":
        chance = (roller.roll("1d6") as DiceRoll).total;
        if (chance == 1) {
          return "wolontariusz INT 10";
        }
      case "Prywatny strzeżony":
        chance = (roller.roll("1d6") as DiceRoll).total;
        if (chance <= 2) {
          return "haker INT 10";
        }
      case "Rządowy":
        chance = (roller.roll("1d3") as DiceRoll).total;
        return `haker INT 12 (${chance})`;
      case "Korporacyjny":
        chance = (roller.roll("1d4") as DiceRoll).total;
        return `haker INT 15 (${chance})`;
      case "Wojskowy":
        chance = (roller.roll("1d6") as DiceRoll).total;
        return `haker INT 16 (${chance})`;
      case "SI":
        return "samoobrona INT 17";
    }
    return "";
  };

  const rollNode = () => {
    let roll = roller.roll(`1d${infoType.length}`) as DiceRoll;
    const ntype = infoType[roll.total - 1];
    roll = roller.roll(`1d${infoLook.length}`) as DiceRoll;
    const look = infoLook[roll.total - 1];
    roll = roller.roll(`1d${infoData.length}`) as DiceRoll;
    const data = infoData[roll.total - 1];
    return [
      {
        name: generateSerialKeys(8, ""),
        ntype: ntype,
        ochr: rollNType(ntype as nt, "ochr"),
        int: rollNType(ntype as nt, "int"),
        lod: rollLOD(ntype as nt),
        more: ntypeMore[ntype as nt],
        personel: rollPersonel(ntype as nt),
        look: look,
        data: data,
      } as NodeType,
    ];
  };

  return { rollNode };
};
