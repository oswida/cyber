import { DiceRoll, DiceRoller } from "@dice-roller/rpg-dice-roller";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
import { useAtom, useAtomValue } from "jotai";
import { v4 as uuidv4 } from "uuid";
import {
  doExport,
  doImport,
  language,
  nodeClassSelected,
  NodeInfo,
  prettyToday,
  rollSingle,
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

const roller = new DiceRoller();

const nodetype: string[] = [
  "pub",
  "priv",
  "privsec",
  "gov",
  "corp",
  "mil",
  "ai",
];

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

  const rollICE = (nclass: string): [string, boolean] => {
    let chance = 0;
    switch (nclass) {
      case "pub":
      case "priv":
        return ["-", false];
      case "privsec":
        chance = rollSingle(roller, "1d6").total;
        if (chance <= 3) return [t`d6`, false];
        break;
      case "gov":
        chance = rollSingle(roller, "1d6").total;
        if (chance <= 3) return [t`d6`, false];
        else return [t`d8`, false];
      case "corp":
        chance = rollSingle(roller, "1d6").total;
        if (chance <= 2) return [t`d8`, true];
        return [t`d8`, false];
      case "mil":
        chance = rollSingle(roller, "1d6").total;
        if (chance <= 3) return [t`d10`, true];
        return [t`d10`, false];
      case "ai":
        return [t`d12`, true];
    }
    return ["-", false];
  };

  const rollPersonel = (nclass: string) => {
    let chance = 0;
    switch (nclass) {
      case "pub":
        chance = rollSingle(roller, "1d6").total;
        if (chance == 1) {
          return `${t`volunteer`} INF 10`;
        }
        break;
      case "privsec":
        chance = rollSingle(roller, "1d6").total;
        if (chance <= 2) {
          return `${t`hacker`} INF 10`;
        }
        break;
      case "gov":
        chance = rollSingle(roller, "1d3").total;
        return `${chance} × haker INF 12`;
      case "corp":
        chance = rollSingle(roller, "1d4").total;
        return `${chance} × haker INF 15`;
      case "mil":
        chance = rollSingle(roller, "1d6").total;
        return `${chance} × ${t`hacker`} INF 16`;
      case "ai":
        return `${t`selfdefense`} INF 17`;
    }
    return "";
  };

  const rollNode = () => {
    var roll: DiceRoll;
    let nclass: string | undefined = nc;
    if (!nclass) {
      roll = rollSingle(roller, `1d${nodetype.length}`);
      nclass = nodetype[roll.total - 1];
    }
    // roll = roller.roll(`1d${infoLook[lang].length}`) as DiceRoll;
    // const look = infoLook[lang][roll.total - 1];
    roll = rollSingle(roller, `1d${infoLookShape[lang].length}`);
    const l1 = infoLookShape[lang][roll.total - 1];
    roll = rollSingle(roller, `1d${infoLookColor[lang].length}`);
    const l2 = infoLookColor[lang][roll.total - 1];
    roll = rollSingle(roller, `1d${infoLookDetail[lang].length}`);
    const l3 = infoLookDetail[lang][roll.total - 1];
    const look = `${l2} ${t`inshape`} ${l1}. ${l3}.`;

    roll = rollSingle(roller, `1d${infoData[lang][nclass].length}`);
    const data = infoData[lang][nclass][roll.total - 1];
    const ib = rollICE(nclass);

    const retv: NodeInfo = {
      id: uuidv4(),
      name: generateSerialKeys(8, ""),
      node_class: NodeClassDict[lang][nclass],
      hp: rollSingle(roller, NodeClassHP[nclass]).total,
      inf: rollSingle(roller, NodeClassInf[nclass]).total,
      ice: ib[0],
      black_ice: ib[1],
      more_security: NodeClassMore[lang][nclass],
      security: rollPersonel(nclass),
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
    const newList: Record<string, NodeInfo> = {};
    Object.keys(gen.node).forEach((k) => {
      const obj = gen.node[k];
      if (!obj || k === id) return;
      newList[k] = obj;
    });
    const newState = { ...gen, node: newList };
    setGen(newState);
    saveGen(newState);
  };

  return { rollNode, generate, clean, exportData, importData, deleteNode };
};
