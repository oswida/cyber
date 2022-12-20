import { prepareTransNpc } from "~/actions/npc";
import { prepareTransSquad } from "~/actions/squad";
import { exportData } from "~/common";

export const Trans = () => {
  // const data = prepareTransCorpo();
  // exportData(data, "corporation.json");
  // const data = prepareTransInode();
  // exportData(data, "inode.json");
  const data = prepareTransSquad();
  exportData(data, "squad.json");
  const data2 = prepareTransNpc();
  exportData(data2, "npc.json");
  return <>Translation</>;
};
