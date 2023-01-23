import { inodGenNpcKey } from "./../common/storage";
import { npcFirstName, npcLastName } from "./../data/npc";
import { rollFrom, rollIndexFrom } from "./../common/util";
import { npcData, NpcInfo, saveGenericData, setNpcData } from "~/common";
import {
  npcGear,
  npcGoal,
  npcLook,
  npcNegativeTrait,
  npcOccupation,
  npcPositiveTrait,
} from "~/data/npc";
import { v4 as uuidv4 } from "uuid";

export const prepareTransNpc = () => {
  const result: Record<string, string> = {};
  npcOccupation.forEach((it, idx) => {
    result[`dictNpcOccupation_${idx.toString().padStart(3, "0")}`] = it;
  });

  npcLook.forEach((it, idx) => {
    result[`dictNpcLook_${idx.toString().padStart(3, "0")}`] = it;
  });
  npcGear.forEach((it, idx) => {
    result[`dictNpcGear_${idx.toString().padStart(3, "0")}`] = it;
  });
  npcPositiveTrait.forEach((it, idx) => {
    result[`dictNpcPositiveTrait_${idx.toString().padStart(3, "0")}`] = it;
  });
  npcNegativeTrait.forEach((it, idx) => {
    result[`dictNpcNegativeTrait_${idx.toString().padStart(3, "0")}`] = it;
  });
  npcGoal.forEach((it, idx) => {
    result[`dictNpcGoal_${idx.toString().padStart(3, "0")}`] = it;
  });
  return result;
};

export const generateNpc = (
  t: (
    key: string,
    params?: Record<string, string> | undefined,
    defaultValue?: string | undefined
  ) => any
) => {
  const occIdx = rollIndexFrom(npcOccupation);
  const ptIdx = rollIndexFrom(npcPositiveTrait);
  const ntIdx = rollIndexFrom(npcNegativeTrait);
  const lookIdx = rollIndexFrom(npcLook);
  const gearIdx = rollIndexFrom(npcGear);
  const goalIdx = rollIndexFrom(npcGoal);

  const retv = {
    id: uuidv4(),
    first_name: rollFrom(npcFirstName),
    surname: rollFrom(npcLastName),
    occupation: t(`dictNpcOccupation_${occIdx.toString().padStart(3, "0")}`),
    positive_trait: t(
      `dictNpcPositiveTrait_${ptIdx.toString().padStart(3, "0")}`
    ),
    negative_trait: t(
      `dictNpcNegativeTrait_${ntIdx.toString().padStart(3, "0")}`
    ),
    look: t(`dictNpcLook_${lookIdx.toString().padStart(3, "0")}`),
    gear: t(`dictNpcGear_${gearIdx.toString().padStart(3, "0")}`),
    goal: t(`dictNpcGoal_${goalIdx.toString().padStart(3, "0")}`),
  } as NpcInfo;

  const data = [...npcData(), retv];
  setNpcData(data);
  saveGenericData(inodGenNpcKey, data);
  return retv;
};

export const deleteNpc = (id: string) => {
  const data = npcData().filter((it) => it.id !== id);
  setNpcData(data);
};
