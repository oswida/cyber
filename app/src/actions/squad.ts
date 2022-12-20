import { squadType } from "~/data/squad";
import {
  squadDetail,
  squadGroup,
  squadLeader,
  squadWeapon,
} from "./../data/squad";

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
