import { useGetRootNode } from "react-tile-pane";
import useLocalStorageState from "use-local-storage-state";
import { hudStorageKey } from "~/common";

export const AutoSaveLayout = () => {
  const getRootNode = useGetRootNode();
  const [data, setData] = useLocalStorageState<string>(hudStorageKey);
  setData(JSON.stringify(getRootNode()));
  return <></>;
};
