import {
  npcGear,
  npcGoal,
  npcLook,
  npcNegativeTrait,
  npcOccupation,
  npcPositiveTrait,
} from "~/data/npc";

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
