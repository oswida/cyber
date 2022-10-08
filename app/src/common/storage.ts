import { compress, decompress } from "@eonasdan/lz-string";
import { useAtom } from "jotai";
import { v4 as uuidv4 } from "uuid";
import {
  GenStateType,
  initialSessionData,
  NoteType,
  sessionDataType,
  stateBoardNotes,
  stateGenerator,
  statePrivateNotes,
  stateSessionData,
  stateStorageSize,
} from "./state";

export const inodLayoutKey = "inod-hud-layout";
export const inodSessionKey = "inod-session";
export const inodNotesKey = "inod-notes";
export const inodBoardKey = "inod-board";
export const inodGenKey = "inod-gen";

export const useStorage = () => {
  const [, setSessionData] = useAtom(stateSessionData);
  const [boardNotes, setBoardNotes] = useAtom(stateBoardNotes);
  const [privNotes, setPrivNotes] = useAtom(statePrivateNotes);
  const [, setStoreSize] = useAtom(stateStorageSize);
  const [gen, setGen] = useAtom(stateGenerator);

  const comp = (data: any) => {
    return compress(JSON.stringify(data));
  };

  const decomp = (data: any) => {
    return JSON.parse(decompress(data));
  };

  const loadSessionData = () => {
    const sessionData = localStorage.getItem(inodSessionKey);
    if (!sessionData) {
      const sd = initialSessionData;
      sd.browserID = uuidv4();
      localStorage.setItem(inodSessionKey, comp(sd));
      setSessionData(sd);
    } else {
      setSessionData(decomp(sessionData));
    }
  };

  const saveSessionData = (value: sessionDataType) => {
    localStorage.setItem(inodSessionKey, comp(value));
    updateStoreSize();
  };

  const loadBoardNotes = () => {
    const data = localStorage.getItem(inodBoardKey);
    if (data && data !== "") {
      console.log(decomp(data));

      setBoardNotes(decomp(data));
    }
  };

  const saveBoardNotes = (state: Record<string, NoteType | undefined>) => {
    localStorage.setItem(inodBoardKey, comp(state));
    updateStoreSize();
  };

  const loadPrivateNotes = () => {
    const data = localStorage.getItem(inodNotesKey);
    if (data && data !== "") {
      setPrivNotes(decomp(data));
    }
  };

  const savePrivateNotes = (state: Record<string, NoteType | undefined>) => {
    localStorage.setItem(inodNotesKey, comp(state));
    updateStoreSize();
  };

  const saveLayout = (root: any) => {
    localStorage.setItem(inodLayoutKey, comp(root));
    updateStoreSize();
  };

  const loadLayout = () => {
    const data = localStorage.getItem(inodLayoutKey);
    return decomp(data);
  };

  const loadGen = () => {
    const data = localStorage.getItem(inodGenKey);
    if (!data) return;
    const item = decomp(data);
    setGen(item);
  };

  const saveGen = (state: GenStateType) => {
    localStorage.setItem(inodGenKey, comp(state));
    updateStoreSize();
  };

  const updateStoreSize = () => {
    let size = 0;
    let data = localStorage.getItem(inodLayoutKey);
    size += data ? data.length : 0;
    data = localStorage.getItem(inodSessionKey);
    size += data ? data.length : 0;
    data = localStorage.getItem(inodNotesKey);
    size += data ? data.length : 0;
    data = localStorage.getItem(inodBoardKey);
    size += data ? data.length : 0;
    data = localStorage.getItem(inodGenKey);
    size += data ? data.length : 0;
    setStoreSize(size);
    return size;
  };

  return {
    loadSessionData,
    saveSessionData,
    loadBoardNotes,
    loadPrivateNotes,
    saveBoardNotes,
    savePrivateNotes,
    saveLayout,
    loadLayout,
    updateStoreSize,
    loadGen,
    saveGen,
  };
};
