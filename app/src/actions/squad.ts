import { generateSerialKeys, rollFrom, rollIndexFrom } from "./../common/util";
import { inodGenSquadKey } from "./../common/storage";
import { SquadInfo } from "./../common/types";
import { squadType } from "~/data/squad";
import {
  squadDetail,
  squadGroup,
  squadLeader,
  squadWeapon,
} from "./../data/squad";
import { v4 as uuidv4 } from "uuid";
import { saveGenericData, setSquadData, squadData } from "~/common";

export const prepareTransSquad = () => {
  const result: Record<string, string> = {};
  squadType.forEach((it, idx) => {
    result[`dictSquadType_${idx.toString().padStart(3, "0")}`] = it;
  });

  squadLeader.forEach((it, idx) => {
    it.forEach((e, i) => {
      result[`dictSquadLeader_${idx}_${i.toString().padStart(3, "0")}`] = e;
    });
  });

  squadGroup.forEach((it, idx) => {
    it.forEach((e, i) => {
      result[`dictSquadGroup_${idx}_${i.toString().padStart(3, "0")}`] = e;
    });
  });

  squadWeapon.forEach((it, idx) => {
    it.forEach((e, i) => {
      result[`dictSquadWeapon_${idx}_${i.toString().padStart(3, "0")}`] = e;
    });
  });

  squadDetail.forEach((it, idx) => {
    it.forEach((e, i) => {
      result[`dictSquadDetail_${idx}_${i.toString().padStart(3, "0")}`] = e;
    });
  });

  return result;
};

const base_weapon = [6, 6, 8, 6, 10, 12];

export const generateSquad = (
  apd: any,
  t: (
    key: string,
    params?: Record<string, string> | undefined,
    defaultValue?: string | undefined
  ) => any,
  stype?: string
) => {
  let sclass = stype;
  if (!sclass) {
    sclass = rollFrom(squadType);
  }
  const sclassIdx = squadType.indexOf(sclass);
  const leaderIdx = rollIndexFrom(squadLeader[sclassIdx]);
  const groupIdx = rollIndexFrom(squadGroup[sclassIdx]);
  const wpnIdx = rollIndexFrom(squadWeapon[sclassIdx]);
  const detailIdx = rollIndexFrom(squadDetail[sclassIdx]);

  const retv = {
    id: uuidv4(),
    symbol: generateSerialKeys(10, ""),
    squad_type: t(`dictSquadType_${sclassIdx.toString().padStart(3, "0")}`),
    base_weapon: `${t("dice_letter")}${base_weapon[sclassIdx]}`,
    leader: t(
      `dictSquadLeader_${sclassIdx}_${leaderIdx.toString().padStart(3, "0")}`
    ),
    group: t(
      `dictSquadGroup_${sclassIdx}_${groupIdx.toString().padStart(3, "0")}`
    ),
    weapon: t(
      `dictSquadWeapon_${sclassIdx}_${wpnIdx.toString().padStart(3, "0")}`
    ),
    detail: t(
      `dictSquadDetail_${sclassIdx}_${detailIdx.toString().padStart(3, "0")}`
    ),
  } as SquadInfo;

  const data = [...squadData(), retv];
  setSquadData(data);
  saveGenericData(inodGenSquadKey, data);
  return retv;
};

export const deleteSquad = (id: string) => {
  const data = squadData().filter((it) => it.id !== id);
  setSquadData(data);
};
