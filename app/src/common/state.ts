import { atom } from "jotai";

export const menuVisible = atom<boolean>(false);
export const currentPage = atom<string>("");
export const language = atom<string>("pl");

export const hudStorageKey = "inod-hud-layout";
