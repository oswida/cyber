import { stateNotification } from "./state";
import { useAtom } from "jotai";
export const useNotify = () => {
  const [nt, setNt] = useAtom(stateNotification);

  const notify = (info: string, time: number) => {
    setNt(info);
    setTimeout(() => {
      setNt("");
    }, time);
  };
  return { notify };
};
