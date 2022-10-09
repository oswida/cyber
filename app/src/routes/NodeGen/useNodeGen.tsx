import { DiceRoll, DiceRoller } from "@dice-roller/rpg-dice-roller";
import { useAtom, useAtomValue } from "jotai";
import {
  doExport,
  doImport,
  globalStr,
  language,
  nodeClassSelected,
  NodeType,
  prettyToday,
  stateGenerator,
} from "~/common";
import { useStorage } from "~/common/storage";
import {
  infoData,
  infoLookColor,
  infoLookDetail,
  infoLookShape,
  NodeClassDict,
  NodeClassHP,
  NodeClassInf,
  NodeClassMore,
} from "~/data";
import { v4 as uuidv4 } from "uuid";

const roller = new DiceRoller();

const nodetype = ["pub", "priv", "privsec", "gov", "corp", "mil", "ai"];

export const useNodeGen = () => {
  const lang = useAtomValue(language);
  const [gen, setGen] = useAtom(stateGenerator);
  const { saveGen } = useStorage();
  const nc = useAtomValue(nodeClassSelected);

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
    let chance = 0;
    switch (nclass) {
      case "pub":
      case "priv":
        return ["-", false];
      case "privsec":
        chance = (roller.roll("1d6") as DiceRoll).total;
        if (chance <= 3) return [globalStr[lang]["d6"], false];
        break;
      case "gov":
        chance = (roller.roll("1d6") as DiceRoll).total;
        if (chance <= 3) return [globalStr[lang]["d6"], false];
        else return [globalStr[lang]["d8"], false];
      case "corp":
        chance = (roller.roll("1d6") as DiceRoll).total;
        if (chance <= 2) return [globalStr[lang]["d8"], true];
        return [globalStr[lang]["d8"], false];
      case "mil":
        chance = (roller.roll("1d6") as DiceRoll).total;
        if (chance <= 3) return [globalStr[lang]["d10"], true];
        return [globalStr[lang]["d10"], false];
      case "ai":
        return [globalStr[lang]["d12"], true];
    }
    return ["-", false];
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

  const rollNode = () => {
    var roll: DiceRoll;
    let nclass: string | undefined = nc;
    if (!nclass) {
      roll = roller.roll(`1d${nodetype.length}`) as DiceRoll;
      nclass = nodetype[roll.total - 1] as string;
    }
    // roll = roller.roll(`1d${infoLook[lang].length}`) as DiceRoll;
    // const look = infoLook[lang][roll.total - 1];
    roll = roller.roll(`1d${infoLookShape[lang].length}`) as DiceRoll;
    const l1 = infoLookShape[lang][roll.total - 1];
    roll = roller.roll(`1d${infoLookColor[lang].length}`) as DiceRoll;
    const l2 = infoLookColor[lang][roll.total - 1];
    roll = roller.roll(`1d${infoLookDetail[lang].length}`) as DiceRoll;
    const l3 = infoLookDetail[lang][roll.total - 1];
    const look = `${l2} ${globalStr[lang]["inshape"]} ${l1}. ${l3}.`;

    roll = roller.roll(`1d${infoData[lang][nclass!!].length}`) as DiceRoll;
    const data = infoData[lang][nclass!!][roll.total - 1];
    const [ice, black] = rollICE(nclass as string);

    const retv: NodeType = {
      id: uuidv4(),
      name: generateSerialKeys(8, ""),
      node_class: NodeClassDict[lang][nclass!!],
      hp: (roller.roll(NodeClassHP[nclass!!]) as DiceRoll).total,
      inf: (roller.roll(NodeClassInf[nclass!!]) as DiceRoll).total,
      ice: ice as string,
      black_ice: black as boolean,
      more_security: NodeClassMore[lang][nclass!!],
      security: rollPersonel(nclass!!),
      look: look,
      data: data,
    };
    return retv;
  };

  const generate = () => {
    const item = rollNode();
    const newState = { ...gen };
    newState.node[item.id] = item;
    setGen(newState);
    saveGen(newState);
  };

  const clean = () => {
    const newState = { ...gen, node: {} };
    setGen(newState);
    saveGen(newState);
  };

  const exportData = () => {
    const filename = `infonode-${prettyToday()}.json`;
    doExport(gen.node, filename);
  };

  const importData = () => {
    doImport((data: any) => {
      const newState = { ...gen, node: data };
      setGen(newState);
      saveGen(newState);
    });
  };

  const deleteNode = (id: string) => {
    const newList: Record<string, NodeType> = {};
    Object.keys(gen.node).forEach((k) => {
      if (k !== id && gen.node[k]) newList[k] = gen.node[k]!!;
    });
    const newState = { ...gen, node: newList };
    setGen(newState);
    saveGen(newState);
  };

  return { rollNode, generate, clean, exportData, importData, deleteNode };
};
