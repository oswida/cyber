import { atom } from "jotai";
import { TileBranchSubstance } from "react-tile-pane";
import {
  CorpoInfo,
  NatsInfo,
  NodeInfo,
  Note,
  NoteInfo,
  NpcInfo,
  PcInfo,
  RollHistoryEntry,
  SessionInfo,
} from "./types";

export const currentPage = atom<string>("");
export const language = atom<string>("pl");

export const modalOpen = atom<boolean>(false);
export const hudPanelSelectionOpen = atom<boolean>(false);

export const hudPanelActive = atom<Record<string, boolean>>({});

export const genNames = ["npc", "corpo", "node", "place", "job"];
export const globalPaneNames = atom<string[]>([]);

export const genMenuOpen = atom<boolean>(false);

export const nodeClassMenuOpen = atom<boolean>(false);
export const nodeClassSelected = atom<string | undefined>(undefined);

export const selectedRollerDice = atom<string>("");

export const stateRollHistory = atom<RollHistoryEntry[]>([]);

export const initialSessionData = {
  username: "",
  browserID: "",
  hosting: false,
  remote: "",
  nats: "",
  nats_token: "",
  lang: "en",
};
export const stateSessionData = atom<SessionInfo>(initialSessionData);

export const configOpen = atom<boolean>(false);

// nats token: 03c2ba5c-c834-4afa-ac1b-355ae5ce7a1b

export const stateNats = atom<NatsInfo>({
  connection: null,
  sub: null,
});

export type NatsMessage = {
  sender: string;
  data: string;
};
export const queueInfo = atom<NatsMessage[]>([]);

export const statePrivateNotes = atom<Record<string, Note | undefined>>({});
export const stateBoardNotes = atom<Record<string, Note | undefined>>({});

export const stateStorageSize = atom<number>(0);

export const stateNoteInfo = atom<NoteInfo>({
  open: false,
  note: undefined,
});

export const stateSelNote = atom<string>("");
export const stateNoteFilter = atom<string>("");

export type GenStateType = {
  corpo: Record<string, CorpoInfo | undefined>;
  node: Record<string, NodeInfo | undefined>;
  npc: Record<string, NpcInfo | undefined>;
};

export const stateGenerator = atom<GenStateType>({
  corpo: {},
  node: {},
  npc: {},
});

export const stateHudLayout = atom<TileBranchSubstance | null>(null);

export const statePlayers = atom<Record<string, PcInfo | undefined>>({});

export type PlayerFormState = {
  item: PcInfo | undefined;
  open: boolean;
};
export const statePlayerForm = atom<PlayerFormState>({
  item: undefined,
  open: false,
});

export const stateNotification = atom<string>("");

export const stateDrawAutosave = atom<boolean>(true);

export const stateDrawCache = atom<any>(null);
