import { atom } from "jotai";

export const currentPage = atom<string>("");
export const language = atom<string>("pl");

export const inodLayoutKey = "inod-hud-layout";

export const modalOpen = atom<boolean>(false);
export const hudPanelSelectionOpen = atom<boolean>(false);

export const hudPanelNames = ["npc", "chat", "board", "roll", "notes"];
export const hudPanelActive = atom<Record<string, boolean>>({});

export const genNames = ["npc", "corpo", "node", "place", "job"];

export const genMenuOpen = atom<boolean>(false);

export const nodeClassMenuOpen = atom<boolean>(false);
export const nodeClassSelected = atom<string | undefined>(undefined);

export const selectedRollerDice = atom<string>("");

export type RollHistoryEntry = {
  id: string;
  user: string;
  time: string;
  comment: string;
  data: string;
};
export const stateRollHistory = atom<RollHistoryEntry[]>([]);

export const inodSessionKey = "inod-session-id";
export type sessionDataType = {
  username: string;
  browserID: string;
};
export const stateSessionData = atom<sessionDataType>({
  username: "",
  browserID: "",
});
