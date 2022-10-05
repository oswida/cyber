import { CorpoType, NodeType } from "./types";
import { atom } from "jotai";
import { NatsConnection, Subscription } from "nats.ws";

export const currentPage = atom<string>("");
export const language = atom<string>("pl");

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

export type sessionDataType = {
  username: string;
  browserID: string;
  remote: string;
  hosting: boolean;
  nats: string;
};
export const initialSessionData = {
  username: "",
  browserID: "",
  hosting: false,
  remote: "",
  nats: "ws://51.68.143.35:4223",
};
export const stateSessionData = atom<sessionDataType>(initialSessionData);

export const configOpen = atom<boolean>(false);

// nats token: 03c2ba5c-c834-4afa-ac1b-355ae5ce7a1b
export type NatsType = {
  connection: NatsConnection | null;
  sub: Subscription | null;
};
export const stateNats = atom<NatsType>({
  connection: null,
  sub: null,
});

export type NatsMessage = {
  sender: string;
  data: string;
};
export const queueInfo = atom<NatsMessage[]>([]);

export type NoteType = {
  id: string;
  title: string;
  content: string;
  author: string;
};

export const statePrivateNotes = atom<Record<string, NoteType | undefined>>({});
export const stateBoardNotes = atom<Record<string, NoteType | undefined>>({});

export const stateStorageSize = atom<number>(0);

export type NoteInfoType = {
  open: boolean;
  note: NoteType | undefined;
};

export const stateNoteInfo = atom<NoteInfoType>({
  open: false,
  note: undefined,
});

export const stateSelNote = atom<string>("");
export const stateNoteFilter = atom<string>("");

export type GenStateType = {
  corpo: Record<string, CorpoType | undefined>;
  node: Record<string, NodeType | undefined>;
};

export const stateGenerator = atom<GenStateType>({
  corpo: {},
  node: {},
});
