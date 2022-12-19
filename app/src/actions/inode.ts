import { v4 as uuidv4 } from "uuid";
import {
  generateSerialKeys,
  inodeData,
  inodGenInodeKey,
  rollFrom,
  saveGenericData,
  setInodeData,
} from "~/common";
import {
  inodeLookColor,
  inodeLookDetail,
  inodeLookShape,
  inodeLoot,
  inodeType,
} from "~/data/inode";
import { NodeInfo } from "./../common/types";
import { rollIndexFrom, rollSingle } from "./../common/util";
import { inodeSecurity } from "./../data/inode";

// Infosphere

export const prepareTransInode = () => {
  const result: Record<string, string> = {};
  inodeType.forEach((it, idx) => {
    result[`dictNodeType_${idx.toString().padStart(3, "0")}`] = it;
  });

  inodeLookShape.forEach((it, idx) => {
    result[`dictNodeShape_${idx.toString().padStart(3, "0")}`] = it;
  });
  inodeLookColor.forEach((it, idx) => {
    result[`dictNodeColor_${idx.toString().padStart(3, "0")}`] = it;
  });
  inodeLookDetail.forEach((it, idx) => {
    result[`dictNodeDetail_${idx.toString().padStart(3, "0")}`] = it;
  });
  Object.keys(inodeLoot).forEach((key) => {
    inodeLoot[key].forEach((it, idx) => {
      result[`dictNodeLoot_${key}_${idx.toString().padStart(3, "0")}`] = it;
    });
  });
  return result;
};

export const generateInode = (
  apd: any,
  t: (
    key: string,
    params?: Record<string, string> | undefined,
    defaultValue?: string | undefined
  ) => any,
  ntype?: string
) => {
  let nclass = ntype;
  if (!nclass) {
    nclass = rollFrom(inodeType);
  }
  const secur = inodeSecurity[nclass];
  const nclassIdx = inodeType.indexOf(nclass);
  let bi = false;
  if (secur.black > 0) {
    const d6 = rollSingle("1d6").total;
    if (d6 <= secur.black) bi = true;
  }
  const dataIdx = rollIndexFrom(inodeLoot[nclass]);
  const shapeIdx = rollIndexFrom(inodeLookShape);
  const colorIdx = rollIndexFrom(inodeLookColor);
  const detailIdx = rollIndexFrom(inodeLookDetail);

  const retv: NodeInfo = {
    id: uuidv4(),
    name: generateSerialKeys(8, ""),
    node_class: t(`dictNodeType_${nclassIdx.toString().padStart(3, "0")}`),
    hp: rollSingle(`1d${secur.hp}`).total + secur.mod,
    inf: rollSingle(`1d${secur.inf}`).total,
    ice: `${t("dice_letter")}${secur.ice}`,
    black_ice: bi,
    activation: secur.activation,
    data: t(`dictNodeLoot_${nclass}_${dataIdx.toString().padStart(3, "0")}`),
    shape: t(`dictNodeShape_${shapeIdx.toString().padStart(3, "0")}`),
    color: t(`dictNodeColor_${colorIdx.toString().padStart(3, "0")}`),
    detail: t(`dictNodeDetail_${detailIdx.toString().padStart(3, "0")}`),
  };

  const data = [...inodeData(), retv];
  setInodeData(data);
  saveGenericData(inodGenInodeKey, data);
  return retv;
};

export const deleteInode = (id: string) => {
  const data = inodeData().filter((it) => it.id !== id);
  setInodeData(data);
};
