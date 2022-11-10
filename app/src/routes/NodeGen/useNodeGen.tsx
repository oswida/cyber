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
  rollFrom,
  rollSingle,
  stateGenerator,
} from "~/common";
import { useStorage } from "~/common/storage";
import {
  dictNodeActivation,
  dictNodeBlackIceProb,
  dictNodeClass,
  dictNodeClassTrans,
  dictNodeData,
  dictNodeDice,
  dictNodeLookColor,
  dictNodeLookDetail,
  dictNodeLookShape,
} from "~/data";

const roller = new DiceRoller();

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

  const hasBlackICE = (nc: string) => {
    const num = dictNodeBlackIceProb[nc];
    const roll = rollSingle(roller, "1d6").total;
    return roll <= num;
  };

  const rollNode = () => {
    var roll: DiceRoll;
    let nclass: string | undefined = nc;

    if (!nclass) {
      nclass = rollFrom(roller, dictNodeClass);
    }

    const l1 = rollFrom(roller, dictNodeLookShape);
    const l2 = rollFrom(roller, dictNodeLookColor);
    const l3 = rollFrom(roller, dictNodeLookDetail);

    const data = rollFrom(roller, dictNodeData[nclass]);
    const isblack = hasBlackICE(nclass);
    const dice = dictNodeDice[nclass];

    const retv: NodeInfo = {
      id: uuidv4(),
      name: generateSerialKeys(8, ""),
      node_class: i18n._(dictNodeClassTrans[nclass]),
      hp: rollSingle(roller, dice[0]).total,
      inf: rollSingle(roller, dice[1]).total,
      ice: i18n._(dice[1]),
      black_ice: isblack,
      shape: i18n._(l1),
      color: i18n._(l2),
      detail: i18n._(l3),
      data: data,
      activation: dictNodeActivation[nclass],
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
