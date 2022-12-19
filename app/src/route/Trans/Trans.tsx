import { prepareTransInode } from "~/actions/inode";
import { exportData } from "~/common";

export const Trans = () => {
  // const data = prepareTransCorpo();
  // exportData(data, "corporation.json");
  const data = prepareTransInode();
  exportData(data, "inode.json");
  return <>Translation</>;
};
