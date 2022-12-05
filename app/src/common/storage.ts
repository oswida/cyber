import { v4 as uuidv4 } from "uuid";
import { setCorporationData } from "~/common";
import { setSessionData, setStorageSize } from "./signals";
import { emptySessionInfo, SessionInfo } from "./types";
import { compressData, decompressData } from "./util";

export const inodSessionKey = "inod-session2";
export const inodNotesKey = "inod-notes2";
export const inodBoardKey = "inod-board2";
export const inodGenCorporationKey = "inod-gen-corporation2";
export const inodPlayersKey = "inod-players2";
export const inodRollsKey = "inod-rolls2";
export const inodDrawKey = "inod-draw2";
export const inodTrackKey = "inod-track2";

export const saveSessionData = (value: SessionInfo) => {
  localStorage.setItem(inodSessionKey, compressData(value));
  updateStoreSize();
};

export const loadSessionData = () => {
  const sdata = localStorage.getItem(inodSessionKey);
  if (!sdata) {
    const sd = emptySessionInfo(true);
    localStorage.setItem(inodSessionKey, compressData(sd));
    setSessionData(sd);
    saveSessionData(sd);
    return sd;
  } else {
    const dd = decompressData(sdata) as SessionInfo;
    if (!dd.lang) dd.lang = "en";
    if (!dd.color) dd.color = "#ffffff";
    if (dd.browserID.trim() == "") {
      dd.browserID = uuidv4();
      saveSessionData(dd);
    }
    setSessionData(dd);
    return dd;
  }
};

export const saveGenericData = (key: string, data: any) => {
  localStorage.setItem(key, compressData(data));
  updateStoreSize();
};

export const loadGenCorporations = () => {
  const data = localStorage.getItem(inodGenCorporationKey);
  if (!data) return;
  const dd = decompressData(data);
  setCorporationData(dd);
};

export const loadRolls = (appData: any) => {
  const data = localStorage.getItem(inodRollsKey);
  if (!data) return;
  const dd = decompressData(data);
  appData.setRollHistory(dd);
};

export const loadNotes = (appData: any, isShared: boolean) => {
  const data = localStorage.getItem(isShared ? inodBoardKey : inodNotesKey);
  if (!data) return;
  const dd = decompressData(data);
  if (isShared) appData.setBoardData(dd);
  else appData.setNoteData(dd);
};

export const loadTracks = (appData: any) => {
  const data = localStorage.getItem(inodTrackKey);
  if (!data) return;
  const dd = decompressData(data);
  appData.setTrackData(dd);
};

export const loadDraw = () => {
  const data = localStorage.getItem(inodDrawKey);
  if (!data) return {};
  const dd = decompressData(data);
  return dd;
};

export const loadChars = (appData: any) => {
  const data = localStorage.getItem(inodPlayersKey);
  const dd = decompressData(data);
  appData.setCharData(dd);
};

export const updateStoreSize = () => {
  let size = 0;
  const keys = [
    inodSessionKey,
    inodNotesKey,
    inodBoardKey,
    inodGenCorporationKey,
    inodPlayersKey,
    inodRollsKey,
    inodDrawKey,
    inodTrackKey,
  ];
  keys.forEach((k) => {
    const data = localStorage.getItem(k);
    size += data ? data.length : 0;
  });
  setStorageSize(size);
  return size;
};
