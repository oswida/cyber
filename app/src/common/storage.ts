import { AppDataType } from "./signals";
import { setCorporationData } from "~/common";
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

export const loadSessionData = (appData: AppDataType) => {
  if (!appData) return;
  const sessionData = localStorage.getItem(inodSessionKey);
  if (!sessionData) {
    console.log("no session data!");

    const sd = emptySessionInfo();
    localStorage.setItem(inodSessionKey, compressData(sd));
    appData.setSessionData(sd);
  } else {
    const dd = decompressData(sessionData);
    if (!dd.lang) dd.lang = "en";
    if (!dd.color) dd.color = "#ffffff";
    appData.setSessionData(dd);
  }
};

export const saveSessionData = (appData: any, value: SessionInfo) => {
  localStorage.setItem(inodSessionKey, compressData(value));
  updateStoreSize(appData);
};

export const saveGenericData = (appData: any, key: string, data: any) => {
  localStorage.setItem(key, compressData(data));
  updateStoreSize(appData);
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
  const data1 = localStorage.getItem("inod-board");
  const dd1 = decompressData(data1);
  console.log("board1", dd1);
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
  const data1 = localStorage.getItem("inod-players");
  const dd1 = decompressData(data1);
  console.log("players1", dd1);
};

export const updateStoreSize = (appData: any) => {
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
  appData.setStorageSize(size);
  return size;
};
