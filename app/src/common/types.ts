import { NatsConnection, Subscription } from "nats.ws";

export type CorpoInfo = {
  id: string;
  name: string;
  operations: string[];
  slogan: string;
  gossip: string;
};

export type NodeInfo = {
  id: string;
  name: string;
  node_class: string;
  hp: number;
  inf: number;
  security: string;
  ice: string;
  black_ice: boolean;
  more_security: string;
  data: string;
  look: string;
};

export type NpcInfo = {
  id: string;
  name: string;
  surname: string;
  traits: string[];
  occupation: string;
  goal: string;
  look: string;
  gear: string;
};

export type PcSlot = {
  description: string;
  fatigue: boolean;
};

export type PcMod = {
  id: string;
  name: string;
  description: string;
  activated: boolean;
  need_activation: boolean;
};

export type PcInfo = {
  id: string;
  name: string;
  bio: [number, number];
  psy: [number, number];
  inf: [number, number];
  hp: [number, number];
  armor: number;
  subscription: string;
  credits: number;
  inventory: PcSlot[];
  cybermods: PcMod[];
  cyberdeck: PcMod[];
  shared: boolean;
  deprived?: boolean;
};

export type RollHistoryEntry = {
  id: string;
  user: string;
  time: string;
  comment: string;
  data: string;
};

export type SessionInfo = {
  username: string;
  browserID: string;
  remote: string;
  hosting: boolean;
  nats: string;
  nats_token: string;
  lang?: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  author: string;
};

export type NoteInfo = {
  open: boolean;
  note: Note | undefined;
};

export type NatsInfo = {
  connection: NatsConnection | null;
  sub: Subscription | null;
};

export type SessionPack = {
  board: Record<string, Note | undefined>;
  notes: Record<string, Note | undefined>;
  players: Record<string, PcInfo | undefined>;
};
