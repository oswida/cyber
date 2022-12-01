import { v4 as uuidv4 } from "uuid";
import {
  CorpoInfo,
  corporationData,
  rollFrom,
  rollIndexFrom,
  rollSingle,
  setCorporationData,
} from "~/common";
import {
  dictCorpoEmployeeProfile,
  dictCorpoGossip,
  dictCorpoNameFirst,
  dictCorpoNameSecond,
  dictCorpoNameSector,
  dictCorpoObjective,
  dictCorpoResources,
  dictCorpoSector,
} from "../data/corpo";
import { inodGenCorporationKey, saveGenericData } from "./../common/storage";

export const deleteCorpo = (id: string) => {
  const data = corporationData().filter((it) => it.id !== id);
  setCorporationData(data);
};

export const generateCorpo = (
  apd: any,
  t: (
    key: string,
    params?: Record<string, string> | undefined,
    defaultValue?: string | undefined
  ) => any
) => {
  const name1 = rollFrom(dictCorpoNameFirst);
  const name2 = rollFrom(dictCorpoNameSecond);
  const sectors = [];
  if (Object.hasOwn(dictCorpoNameSector, name2)) {
    const sector = Object.entries(dictCorpoNameSector).filter(
      (e) => e[0] === name2
    )[0][1];
    sectors.push(dictCorpoSector.indexOf(sector));
  }
  const dl = rollSingle("1d3").total;
  while (sectors.length < dl) {
    const t = rollIndexFrom(dictCorpoSector);
    if (sectors.indexOf(t) === -1) sectors.push(t);
  }

  const gossipIdx = rollIndexFrom(dictCorpoGossip);
  const resources: number[] = [];
  const num = rollSingle(`1d2`).total;
  while (resources.length < num) {
    const r = rollIndexFrom(dictCorpoResources);
    if (resources.indexOf(r) === -1) resources.push(r);
  }
  const profileIdx = rollIndexFrom(dictCorpoEmployeeProfile);
  const objectiveIdx = rollIndexFrom(dictCorpoObjective);

  const retv: CorpoInfo = {
    id: uuidv4(),
    name: `${name1} ${name2}`,
    sectors: sectors.map((it) =>
      t(`dictCorpoSector_${it.toString().padStart(3, "0")}`)
    ),
    gossip: t(`dictCorpoGossip_${gossipIdx.toString().padStart(3, "0")}`),
    resources: resources.map((it) =>
      t(`dictCorpoResources_${it.toString().padStart(3, "0")}`)
    ),
    employeeProfile: t(
      `dictCorpoEmployeeProfile_${profileIdx.toString().padStart(3, "0")}`
    ),
    objective: t(
      `dictCorpoObjective_${objectiveIdx.toString().padStart(3, "0")}`
    ),
  };

  const data = [...corporationData(), retv];
  setCorporationData(data);
  saveGenericData(inodGenCorporationKey, data);
  return retv;
};

export const prepareTransCorpo = () => {
  const result: Record<string, string> = {};
  dictCorpoSector.forEach((it, idx) => {
    result[`dictCorpoSector_${idx.toString().padStart(3, "0")}`] = it;
  });
  dictCorpoGossip.forEach((it, idx) => {
    result[`dictCorpoGossip_${idx.toString().padStart(3, "0")}`] = it;
  });
  dictCorpoResources.forEach((it, idx) => {
    result[`dictCorpoResources_${idx.toString().padStart(3, "0")}`] = it;
  });
  dictCorpoObjective.forEach((it, idx) => {
    result[`dictCorpoObjective_${idx.toString().padStart(3, "0")}`] = it;
  });
  dictCorpoEmployeeProfile.forEach((it, idx) => {
    result[`dictCorpoEmployeeProfile_${idx.toString().padStart(3, "0")}`] = it;
  });
  return result;
};
