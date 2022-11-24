import { prepareTransCorpo } from "~/actions";
import { exportData } from "~/common";

export const Trans = () => {
  const data = prepareTransCorpo();
  exportData(data, "corporation.json");
  return <>Translation</>;
};
