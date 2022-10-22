import { RollHistoryEntry } from "~/common";
import { compress, decompress } from "@eonasdan/lz-string";
import { useAtom } from "jotai";
import { TileBranchSubstance } from "react-tile-pane";
import { v4 as uuidv4 } from "uuid";
import {
  GenStateType,
  initialSessionData,
  stateBoardNotes,
  stateGenerator,
  statePlayers,
  statePrivateNotes,
  stateRollHistory,
  stateSessionData,
  stateStorageSize,
} from "./state";
import { Note, PcInfo, SessionInfo } from "./types";

export const inodLayoutKey = "inod-hud-layout";
export const inodSessionKey = "inod-session";
export const inodNotesKey = "inod-notes";
export const inodBoardKey = "inod-board";
export const inodGenKey = "inod-gen";
export const inodPlayersKey = "inod-players";
export const inodRollsKey = "inod-rolls";

export const useStorage = () => {
  const [, setSessionData] = useAtom(stateSessionData);
  const [boardNotes, setBoardNotes] = useAtom(stateBoardNotes);
  const [privNotes, setPrivNotes] = useAtom(statePrivateNotes);
  const [, setStoreSize] = useAtom(stateStorageSize);
  const [gen, setGen] = useAtom(stateGenerator);
  const [players, setPlayers] = useAtom(statePlayers);
  const [rollHistory, setRollHistory] = useAtom(stateRollHistory);

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
      const dd = decomp(sessionData);
      if (!dd.lang) dd.lang = "en";
      setSessionData(dd);
    }
  };

  const saveSessionData = (value: SessionInfo) => {
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

  const saveBoardNotes = (state: Record<string, Note | undefined>) => {
    localStorage.setItem(inodBoardKey, comp(state));
    updateStoreSize();
  };

  const loadPrivateNotes = () => {
    const data = localStorage.getItem(inodNotesKey);
    if (data && data !== "") {
      setPrivNotes(decomp(data));
    }
  };

  const savePrivateNotes = (state: Record<string, Note | undefined>) => {
    localStorage.setItem(inodNotesKey, comp(state));
    updateStoreSize();
  };

  const saveLayout = (root: any) => {
    console.log("saving layout", root);

    localStorage.setItem(inodLayoutKey, comp(root));
    updateStoreSize();
  };

  const clearLayout = () => {
    localStorage.removeItem(inodLayoutKey);
  };

  const loadLayout = () => {
    const data = localStorage.getItem(inodLayoutKey);
    return decomp(data) as TileBranchSubstance;
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

  const loadPlayers = () => {
    const data = localStorage.getItem(inodPlayersKey);
    if (data && data !== "") {
      setPlayers(decomp(data));
    }
  };

  const savePlayers = (state: Record<string, PcInfo | undefined>) => {
    localStorage.setItem(inodPlayersKey, comp(state));
    updateStoreSize();
  };

  const loadRolls = () => {
    const data = localStorage.getItem(inodRollsKey);
    if (data && data !== "") {
      setRollHistory(decomp(data));
    }
  };

  const saveRolls = (state: Record<string, RollHistoryEntry | undefined>) => {
    localStorage.setItem(inodRollsKey, comp(state));
    updateStoreSize();
  };

  const updateStoreSize = () => {
    let size = 0;
    const keys = [
      inodLayoutKey,
      inodSessionKey,
      inodNotesKey,
      inodBoardKey,
      inodGenKey,
      inodPlayersKey,
      inodRollsKey,
    ];
    keys.forEach((k) => {
      const data = localStorage.getItem(k);
      size += data ? data.length : 0;
    });
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
    clearLayout,
    updateStoreSize,
    loadGen,
    saveGen,
    loadPlayers,
    savePlayers,
    loadRolls,
    saveRolls,
  };
};
